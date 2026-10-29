<?php

namespace App\Policies;

use App\Models\Invitation;
use App\Models\User;

class InvitationPolicy
{
    /** Admin boleh mengelola semua undangan, user biasa hanya miliknya sendiri. */
    public function manage(User $user, Invitation $invitation): bool
    {
        return $user->isAdmin() || $invitation->user_id === $user->id;
    }
}
