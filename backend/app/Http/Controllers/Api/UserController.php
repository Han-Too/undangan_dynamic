<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

/** Manajemen akun (khusus admin). */
class UserController extends Controller
{
    public function index()
    {
        return User::withCount('invitations')->orderBy('name')->get();
    }

    public function store(Request $request)
    {
        $data = $this->validated($request);
        $data['email'] = strtolower($data['email']);

        return response()->json(User::create($data)->loadCount('invitations'), 201);
    }

    public function update(Request $request, User $user)
    {
        $data = $this->validated($request, $user);
        if (empty($data['password'])) {
            unset($data['password']);
        }
        $data['email'] = strtolower($data['email']);

        // Admin tidak boleh menurunkan / menonaktifkan dirinya sendiri (agar tidak terkunci).
        if ($user->is($request->user())) {
            $data['role'] = User::ROLE_ADMIN;
            $data['is_active'] = true;
        }

        $user->update($data);
        if (! $user->is_active) {
            $user->tokens()->delete();
        }

        return $user->loadCount('invitations');
    }

    public function destroy(Request $request, User $user)
    {
        abort_if($user->is($request->user()), 422, 'Tidak bisa menghapus akun sendiri.');
        $user->invitations->each->delete(); // memicu penghapusan file media tiap undangan
        $user->tokens()->delete();
        $user->delete();

        return response()->noContent();
    }

    private function validated(Request $request, ?User $user = null): array
    {
        return $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'email', 'max:255', Rule::unique('users')->ignore($user?->id)],
            'password' => [$user ? 'nullable' : 'required', 'string', 'min:6'],
            'role' => ['required', Rule::in([User::ROLE_ADMIN, User::ROLE_USER])],
            'is_active' => ['boolean'],
        ]);
    }
}
