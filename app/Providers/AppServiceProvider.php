<?php

namespace App\Providers;

use App\Services\CloudinaryAdapter;
use Cloudinary\Cloudinary;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\ServiceProvider;
use League\Flysystem\Filesystem;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        // Storage::extend('cloudinary', function ($app, $config) {
        //     $cloudinaryInstance = new Cloudinary([
        //         'cloud' => [
        //             'cloud_name' => $config['cloud'],
        //             'api_key'    => $config['key'],
        //             'api_secret' => $config['secret'],
        //         ],
        //     ]);

        //     return new Filesystem(
        //         new CloudinaryAdapter($cloudinaryInstance)
        //     );
        // });
    }
}
