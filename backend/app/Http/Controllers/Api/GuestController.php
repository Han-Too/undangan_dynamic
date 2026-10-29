<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Guest;
use App\Models\Invitation;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Gate;
use Illuminate\Validation\Rule;

/** Tamu undangan. Setiap tamu mendapat link pribadi: /{invitation.slug}/{guest.slug}. */
class GuestController extends Controller
{
    public function index(Invitation $invitation)
    {
        Gate::authorize('manage', $invitation);

        return $invitation->guests()
            ->with('rsvp:id,guest_id,attendance,guests,message,created_at')
            ->latest()
            ->orderByDesc('id')
            ->get();
    }

    /**
     * Tambah satu tamu ({name, phone}) atau banyak sekaligus ({names: "Adit & Istri\nJoko & Istri"}).
     * Format per baris untuk mode banyak: "Nama" atau "Nama | 08123456789".
     */
    public function store(Request $request, Invitation $invitation)
    {
        Gate::authorize('manage', $invitation);
        $data = $request->validate([
            'name' => ['required_without:names', 'nullable', 'string', 'max:150'],
            'phone' => ['nullable', 'string', 'max:30'],
            'names' => ['required_without:name', 'nullable', 'string', 'max:20000'],
        ]);

        $rows = isset($data['names'])
            ? collect(preg_split('/\r\n|\r|\n/', $data['names']))
                ->map(fn ($line) => array_map('trim', explode('|', $line, 2)))
                ->filter(fn ($parts) => $parts[0] !== '')
                ->map(fn ($parts) => ['name' => mb_substr($parts[0], 0, 150), 'phone' => isset($parts[1]) ? mb_substr($parts[1], 0, 30) : null])
                ->values()
            : collect([['name' => trim($data['name']), 'phone' => $data['phone'] ?? null]]);

        abort_if($rows->isEmpty(), 422, 'Isi minimal satu nama tamu.');

        $created = DB::transaction(fn () => $rows->map(fn ($row) => $invitation->guests()->create([
            'name' => $row['name'],
            'phone' => $row['phone'] ?: null,
            'slug' => Guest::uniqueSlug($invitation, $row['name']),
        ])));

        return response()->json($created->each->setRelation('rsvp', null), 201);
    }

    /** Ubah nama/no. HP. Slug (link) tidak berubah kecuali dikirim eksplisit, agar link yang sudah disebar tetap berlaku. */
    public function update(Request $request, Invitation $invitation, Guest $guest)
    {
        Gate::authorize('manage', $invitation);
        $data = $request->validate([
            'name' => ['required', 'string', 'max:150'],
            'phone' => ['nullable', 'string', 'max:30'],
            'slug' => [
                'nullable', 'string', 'max:160', 'alpha_dash:ascii',
                Rule::unique('guests')->where('invitation_id', $invitation->id)->ignore($guest->id),
            ],
        ]);

        $guest->fill([
            'name' => trim($data['name']),
            'phone' => $data['phone'] ?? null,
        ]);
        if (! empty($data['slug'])) {
            $guest->slug = strtolower($data['slug']);
        }
        $guest->save();

        return $guest->load('rsvp:id,guest_id,attendance,guests,message,created_at');
    }

    public function destroy(Invitation $invitation, Guest $guest)
    {
        Gate::authorize('manage', $invitation);
        $guest->delete();

        return response()->noContent();
    }
}
