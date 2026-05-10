<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Services\Auth\Profile;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProfileController extends Controller
{
    protected $profileService;

    public function __construct(Profile $profileService)
    {
        $this->profileService = $profileService;
    }

    public function edit()
    {
        return Inertia::render('Auth/Profile', [
            'status' => session('status'),
        ]);
    }

    public function update(Request $request)
    {
        $user = $request->user();

        $validated = $this->profileService->validateProfile($request->all(), $user->id);
        $this->profileService->updateProfile($user, $validated);

        return back()->with('status', 'profile-updated');
    }
}