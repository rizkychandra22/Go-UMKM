<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Services\Auth\AuthService;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

class RegisterController extends Controller
{
    protected $authService;

    public function __construct(AuthService $authService)
    {
        $this->authService = $authService;
    }

    public function index()
    {
        if (auth()->check()) {
            return $this->authService->redirectByRole(auth()->user());
        }

        return Inertia::render('Auth/Register');
    }

    public function store(Request $request)
    {
        $validatedData = $this->authService->validateRegister($request->all());
        $user = $this->authService->register($validatedData);

        // Auto Login Sesudah Daftar 
        Auth::login($user);
        return $this->authService->redirectByRole($user);
    }
}