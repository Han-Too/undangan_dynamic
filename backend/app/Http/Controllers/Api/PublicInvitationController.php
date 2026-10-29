<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Invitation;
use App\Models\Rsvp;
use Illuminate\Http\Request;

/** Endpoint tanpa login yang dipakai halaman undangan untuk tamu. */
class PublicInvitationController extends Controller
{
    private const WISHES_LIMIT = 50;

    /** GET /api/public/invitations/{slug}?guest={guestSlug} */
    public function show(Request $request, string $slug)
    {
        $invitation = $this->findPublished($slug);

        $guest = null;
        if ($guestSlug = $request->query('guest')) {
            $guest = $invitation->guests()->where('slug', $guestSlug)->first();
            if ($guest) {
                $guest->opened_at ??= now();
                $guest->open_count++;
                $guest->save();
            }
        }

        return [
            'invitation' => [
                'title' => $invitation->title,
                'slug' => $invitation->slug,
                'config' => $invitation->config,
                'audio_url' => $invitation->audio_url,
            ],
            'guest' => $guest ? [
                'name' => $guest->name,
                'slug' => $guest->slug,
                'rsvp' => $guest->rsvp?->toEntry(),
            ] : null,
            'rsvps' => $this->wishes($invitation),
        ];
    }

    /**
     * POST /api/public/invitations/{slug}/rsvps
     * Tamu dengan link pribadi (field `guest`) hanya punya satu RSVP: kirim ulang = memperbarui.
     */
    public function rsvp(Request $request, string $slug)
    {
        $invitation = $this->findPublished($slug);
        $input = $request->validate([...Rsvp::rules(), 'guest' => ['nullable', 'string', 'max:160']]);
        $data = Rsvp::normalize($input);

        $guest = ! empty($input['guest']) ? $invitation->guests()->where('slug', $input['guest'])->first() : null;

        $rsvp = $guest
            ? $invitation->rsvps()->updateOrCreate(['guest_id' => $guest->id], $data)
            : $invitation->rsvps()->create($data);

        return response()->json($rsvp->toEntry(), $rsvp->wasRecentlyCreated ? 201 : 200);
    }

    private function findPublished(string $slug): Invitation
    {
        $invitation = Invitation::where('slug', strtolower($slug))->first();
        abort_unless($invitation && $invitation->is_published, 404, 'Undangan tidak ditemukan.');

        return $invitation;
    }

    private function wishes(Invitation $invitation): array
    {
        return $invitation->rsvps()->latest()->orderByDesc('id')->limit(self::WISHES_LIMIT)->get()->map->toEntry()->all();
    }
}
