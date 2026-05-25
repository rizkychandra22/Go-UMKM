<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Services\Auth\ProfileBusiness;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProfileBusinessController extends Controller
{
    protected $profileBusinessService;

    public function __construct(ProfileBusiness $profileBusinessService)
    {
        $this->profileBusinessService = $profileBusinessService;
    }

    public function edit()
    {
        return Inertia::render('Auth/Profile.Business', [
            'status' => session('status'),
        ]);
    }

    public function update(Request $request)
    {
        $user = $request->user();

        $this->profileBusinessService->validateProfile($request->all(), $user->id);
        $this->profileBusinessService->updateProfile($user, $request->all());

        return back()->with('status', 'profile-business-updated');
    }
}