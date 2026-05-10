<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Services\Auth\Request as AuthService; 
use Illuminate\Http\Request;
use Inertia\Inertia;

class LoginController extends Controller
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

        return Inertia::render('Auth/Login');
    }

    public function store(Request $request)
    {
        $credentials = $this->authService->validateLogin($request->all());
        $user = $this->authService->login($credentials, $request->boolean('remember'));
        return $this->authService->redirectByRole($user);
    }

    public function destroy()
    {
        $this->authService->logout();
        return redirect()->route('login');
    }
}