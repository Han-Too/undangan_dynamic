<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Invitation;
use App\Models\Rsvp;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;

/** RSVP yang masuk, dilihat dari dashboard. */
class RsvpController extends Controller
{
    public function index(Invitation $invitation)
    {
        Gate::authorize('manage', $invitation);

        return $invitation->rsvps()->latest()->orderByDesc('id')->get()->map->toEntry();
    }

    /** Uji formulir dari preview builder (tanpa tamu). */
    public function store(Request $request, Invitation $invitation)
    {
        Gate::authorize('manage', $invitation);
        $data = Rsvp::normalize($request->validate(Rsvp::rules()));

        return response()->json($invitation->rsvps()->create($data)->toEntry(), 201);
    }

    public function destroy(Invitation $invitation, Rsvp $rsvp)
    {
        Gate::authorize('manage', $invitation);
        $rsvp->delete();

        return response()->noContent();
    }

    public function clear(Invitation $invitation)
    {
        Gate::authorize('manage', $invitation);
        $invitation->rsvps()->delete();

        return response()->noContent();
    }
}
