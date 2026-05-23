<?php

namespace App\Services\Auth;

use App\Models\User;
use App\Models\Mitra;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class ProfileBusiness
{
    public function validateProfile(array $data, int $userId)
    {
        return Validator::make($data, [
            'business'          => 'required|string|max:255',
            'description'   => 'nullable|string|max:500',
            'image'         => 'nullable|image|mimes:jpeg,png,jpg,webp|max:2048',
        ])->validate();
    }

    public function updateProfile(User $user, array $data): bool
    {
        $mitra = $user->mitra ?? new Mitra(['user_id' => $user->id]);

        $mitra->business = $data['business'];
        $mitra->description = $data['description'] ?? null;

        // Handle Image
        if (isset($data['image']) && $data['image'] instanceof UploadedFile) {
            if ($mitra->image) {
                Storage::disk('public')->delete($mitra->image);
            }
            $mitra->image = $data['image']->store('profiles/business', 'public');
        }

        return $mitra->save();
    }
}