<?php

namespace App\Services\Auth;

use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\ValidationException;

class Request
{
    public function validateRegister(array $data)
    {
        return Validator::make($data, [
            'name'     => 'required|string|max:255',
            'email'    => 'required|string|email|max:255|unique:users',
            'phone'    => 'required|string|unique:users',
            'password' => 'required|string|min:8|confirmed',
            'role'     => 'required|in:customer,seller',
        ])->validate();
    }

    public function validateLogin(array $data)
    {
        return Validator::make($data, [
            'email'    => 'required|email',
            'password' => 'required',
        ])->validate();
    }

    public function register(array $data): User
    {
        return User::create([
            'name'     => $data['name'],
            'email'    => $data['email'],
            'phone'    => $data['phone'],
            'password' => bcrypt($data['password']),
            'role'     => $data['role'] ?? 'customer',
        ]);
    }

    public function login(array $credentials, bool $remember = false): User
    {
        if (!Auth::attempt($credentials, $remember)) {
            throw ValidationException::withMessages([
                'authGagal' => 'Email atau password yang Anda masukkan salah.',
            ]);
        }

        request()->session()->regenerate();
        return Auth::user();
    }

    public function logout(): void
    {
        Auth::logout();
        request()->session()->invalidate();
        request()->session()->regenerateToken();
    }

    public function redirectByRole($user)
    {
        return match ($user->role) {
            'admin'    => redirect()->intended(route('home')),
            'seller'   => redirect()->intended(route('dashboardSeller')),
            'customer' => redirect()->intended(route('dashboardCustomer')),
            default    => redirect()->route('home'),
        };
    }
}