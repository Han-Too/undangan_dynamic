<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Invitation;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\Rule;

class InvitationController extends Controller
{
    /** Daftar undangan: admin melihat semua, user hanya miliknya. `config` tidak ikut agar ringan. */
    public function index(Request $request)
    {
        $user = $request->user();

        return Invitation::query()
            ->select(['id', 'user_id', 'title', 'slug', 'audio_path', 'is_published', 'created_at', 'updated_at'])
            ->with('user:id,name,email')
            ->withCount(['guests', 'rsvps', 'rsvps as attending_count' => fn ($q) => $q->where('attendance', 'hadir')])
            ->unless($user->isAdmin(), fn ($q) => $q->where('user_id', $user->id))
            ->latest('updated_at')
            ->get();
    }

    public function store(Request $request)
    {
        $user = $request->user();
        $data = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'slug' => ['nullable', 'string', 'max:100', 'alpha_dash:ascii', Rule::notIn(Invitation::RESERVED_SLUGS), 'unique:invitations,slug'],
            'user_id' => ['nullable', 'integer', 'exists:users,id'],
        ]);

        $invitation = new Invitation([
            'title' => $data['title'],
            'slug' => strtolower($data['slug'] ?? '') ?: Invitation::uniqueSlug($data['title']),
        ]);
        // Hanya admin yang boleh membuatkan undangan untuk user lain.
        $invitation->user_id = $user->isAdmin() && ! empty($data['user_id']) ? $data['user_id'] : $user->id;
        $invitation->save();

        return response()->json($invitation->load('user:id,name,email'), 201);
    }

    public function show(Invitation $invitation)
    {
        Gate::authorize('manage', $invitation);

        return $invitation->load('user:id,name,email');
    }

    public function update(Request $request, Invitation $invitation)
    {
        Gate::authorize('manage', $invitation);
        $data = $request->validate([
            'title' => ['sometimes', 'required', 'string', 'max:255'],
            'slug' => ['sometimes', 'required', 'string', 'max:100', 'alpha_dash:ascii', Rule::notIn(Invitation::RESERVED_SLUGS), Rule::unique('invitations')->ignore($invitation->id)],
            'is_published' => ['sometimes', 'boolean'],
            'config' => ['sometimes', 'array'],
            'user_id' => ['sometimes', 'integer', 'exists:users,id'],
        ]);

        if (isset($data['slug'])) {
            $data['slug'] = strtolower($data['slug']);
        }
        if (isset($data['user_id'])) {
            abort_unless($request->user()->isAdmin(), 403, 'Hanya admin yang boleh memindahkan pemilik undangan.');
            $invitation->user_id = $data['user_id'];
        }

        if (isset($data['config'])) {
            // Ambil dari body mentah (decode sebagai objek) supaya objek kosong di dalam config tidak jadi array.
            $data['config'] = json_decode($request->getContent(), false)->config ?? $data['config'];
        }

        $invitation->fill($data)->save();

        return $invitation->load('user:id,name,email');
    }

    public function destroy(Invitation $invitation)
    {
        Gate::authorize('manage', $invitation);
        $invitation->delete();

        return response()->noContent();
    }

    /** Unggah foto (sudah dikompres di browser). URL yang dikembalikan disimpan di `config.photos`. */
    public function uploadPhoto(Request $request, Invitation $invitation)
    {
        Gate::authorize('manage', $invitation);
        $request->validate(['file' => ['required', 'image', 'max:8192']]);

        $path = $request->file('file')->store($invitation->mediaDir().'/photos', 'public');

        return ['url' => Invitation::publicUrl($path)];
    }

    public function uploadAudio(Request $request, Invitation $invitation)
    {
        Gate::authorize('manage', $invitation);
        $request->validate(['file' => ['required', 'file', 'max:15360', 'mimetypes:audio/*,video/mp4,video/ogg,video/webm']]);

        $old = $invitation->audio_path;
        $invitation->audio_path = $request->file('file')->store($invitation->mediaDir().'/audio', 'public');
        $invitation->save();
        if ($old) {
            Storage::disk('public')->delete($old);
        }

        return ['audio_url' => $invitation->audio_url];
    }

    public function deleteAudio(Invitation $invitation)
    {
        Gate::authorize('manage', $invitation);
        if ($invitation->audio_path) {
            Storage::disk('public')->delete($invitation->audio_path);
            $invitation->audio_path = null;
            $invitation->save();
        }

        return response()->noContent();
    }

    /** Daftar akun untuk dropdown pemilik undangan (khusus admin). */
    public function owners(Request $request)
    {
        abort_unless($request->user()->isAdmin(), 403);

        return User::orderBy('name')->get(['id', 'name', 'email']);
    }
}
