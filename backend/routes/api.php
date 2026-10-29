<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\GuestController;
use App\Http\Controllers\Api\InvitationController;
use App\Http\Controllers\Api\PublicInvitationController;
use App\Http\Controllers\Api\RsvpController;
use App\Http\Controllers\Api\UserController;
use Illuminate\Support\Facades\Route;

// ── Publik (halaman undangan tamu) ──────────────────────────────
Route::prefix('public/invitations/{slug}')->group(function () {
    Route::get('/', [PublicInvitationController::class, 'show']);
    Route::post('rsvps', [PublicInvitationController::class, 'rsvp'])->middleware('throttle:10,1');
});

Route::post('auth/login', [AuthController::class, 'login'])->middleware('throttle:10,1');

// ── Dashboard (wajib login) ─────────────────────────────────────
Route::middleware(['auth:sanctum', 'active'])->group(function () {
    Route::get('auth/me', [AuthController::class, 'me']);
    Route::post('auth/logout', [AuthController::class, 'logout']);
    Route::put('auth/profile', [AuthController::class, 'updateProfile']);

    Route::get('owners', [InvitationController::class, 'owners']);
    Route::apiResource('invitations', InvitationController::class);
    Route::post('invitations/{invitation}/photos', [InvitationController::class, 'uploadPhoto']);
    Route::post('invitations/{invitation}/audio', [InvitationController::class, 'uploadAudio']);
    Route::delete('invitations/{invitation}/audio', [InvitationController::class, 'deleteAudio']);

    Route::scopeBindings()->group(function () {
        Route::apiResource('invitations.guests', GuestController::class)->except('show');
        Route::delete('invitations/{invitation}/rsvps', [RsvpController::class, 'clear']);
        Route::apiResource('invitations.rsvps', RsvpController::class)->only(['index', 'store', 'destroy']);
    });

    // Khusus admin
    Route::middleware('admin')->group(function () {
        Route::apiResource('users', UserController::class)->except('show');
    });
});
