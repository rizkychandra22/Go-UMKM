<?php

namespace App\Services\Auth;

use App\Models\User;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Rules\Password;
use CloudinaryLabs\CloudinaryLaravel\Facades\Cloudinary; 

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

        // Handle Image Avatar Pribadi langsung menembak API Cloudinary
        if (isset($data['image']) && $data['image'] instanceof UploadedFile) {
            
            // JIKA ADA GAMBAR LAMA: Hapus dari Cloudinary menggunakan helper Public ID bawaan
            if ($user->image) {
                $oldPublicId = $this->getCloudinaryPublicId($user->image);
                if ($oldPublicId) {
                    Cloudinary::uploadApi()->destroy($oldPublicId);
                }
            }

            // PROSES UPLOAD UMUM: Otomatis membuat folder / masuk ke folder yang ditentukan
            $result = Cloudinary::uploadApi()->upload($data['image']->getRealPath(), [
                'folder' => 'Tokoku/profile-account',
            ]);

            // Ambil secure URL HTTPS jika tersedia
            $user->image = $result['secure_url'] ?? $result['url'] ?? null;
        }

        // Reset verifikasi jika email berubah
        if ($user->isDirty('email')) {
            $user->email_verified_at = null;
        }

        return $user->save();
    }

    /**
     * Helper umum untuk mengambil Public ID lengkap beserta path foldernya
     */
    private function getCloudinaryPublicId(string $url): ?string
    {
        $path = parse_url($url, PHP_URL_PATH);
        if (!$path) return null;

        $segments = explode('/', $path);
        $startIndex = array_search('Tokoku', $segments);

        if ($startIndex === false) return null;
        $pathWithExtension = implode('/', array_slice($segments, $startIndex));

        return pathinfo($pathWithExtension, PATHINFO_DIRNAME) . '/' . pathinfo($pathWithExtension, PATHINFO_FILENAME);
    }
}
