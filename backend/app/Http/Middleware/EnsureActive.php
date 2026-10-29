<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

/** Token milik akun yang sudah dinonaktifkan admin langsung ditolak. */
class EnsureActive
{
    public function handle(Request $request, Closure $next): Response
    {
        $user = $request->user();
        if ($user && ! $user->is_active) {
            $user->currentAccessToken()?->delete();
            abort(401, 'Akun Anda dinonaktifkan.');
        }

        return $next($request);
    }
}
