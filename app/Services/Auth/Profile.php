<?php

namespace App\Services\Auth;

use App\Models\User;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Rules\Password;

class Profile
{
    public function validateProfile(array $data, int $userId)
    {
        return Validator::make($data, [
            'name'     => 'required|string|max:255',
            'email'    => ['required', 'string', 'lowercase', 'email', 'max:255', Rule::unique('users')->ignore($userId)],
            'phone'    => ['required', 'string', 'max:20', Rule::unique('users')->ignore($userId)],
            'address'  => 'nullable|string|max:500',
            'image'    => 'nullable|image|mimes:jpeg,png,jpg,webp|max:2048',
            'password' => ['nullable', 'confirmed', Password::defaults()],
        ])->validate();
    }

    public function updateProfile(User $user, array $data): bool
    {
        $user->fill([
            'name'    => $data['name'],
            'email'   => $data['email'],
            'phone'   => $data['phone'],
            'address' => $data['address'] ?? null,
        ]);

        // Update password jika diisi
        if (!empty($data['password'])) {
            $user->password = bcrypt($data['password']);
        }

        // Handle Image
        if (isset($data['image']) && $data['image'] instanceof UploadedFile) {
            if ($user->image) {
                Storage::disk('public')->delete($user->image);
            }
            $user->image = $data['image']->store('profiles', 'public');
        }

        // Reset verifikasi jika email berubah
        if ($user->isDirty('email')) {
            $user->email_verified_at = null;
        }

        return $user->save();
    }
}