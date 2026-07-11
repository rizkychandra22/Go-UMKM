<?php

namespace App\Services\Auth;

use App\Models\Mitra;
use App\Models\User;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Validator;
use CloudinaryLabs\CloudinaryLaravel\Facades\Cloudinary; 

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

        // Handle Image Avatar Pribadi langsung menembak API Cloudinary
        if (isset($data['image']) && $data['image'] instanceof UploadedFile) {
            
            // JIKA ADA GAMBAR LAMA: Hapus dari Cloudinary menggunakan helper Public ID bawaan
            if ($mitra->image) {
                $oldPublicId = $this->getCloudinaryPublicId($mitra->image);
                if ($oldPublicId) {
                    Cloudinary::uploadApi()->destroy($oldPublicId);
                }
            }

            // PROSES UPLOAD UMUM: Otomatis membuat folder / masuk ke folder yang ditentukan
            $result = Cloudinary::uploadApi()->upload($data['image']->getRealPath(), [
                'folder' => 'Tokoku/profile-account',
            ]);

            // Ambil secure URL HTTPS jika tersedia
            $mitra->image = $result['secure_url'] ?? $result['url'] ?? null;
        }

        return $mitra->save();
    }

    /**
     * Extract Cloudinary public id from a stored URL
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
