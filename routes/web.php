<?php

use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\Auth\ProfileController;
use App\Http\Controllers\Auth\RegisterController;
use App\Http\Controllers\Dashboard\CustomerController;
use App\Http\Controllers\Dashboard\SellerController;
use App\Http\Controllers\Web\HomeController;
use Illuminate\Support\Facades\Route;

Route::get('/', [HomeController::class, 'index'])->name('home');

// Auth pages (only for guests)
Route::middleware('guest')->group(function () {
    // Page Login
    Route::get('/auth/login', [LoginController::class, 'index'])->name('login');
    Route::post('/auth/login', [LoginController::class, 'store'])->name('login.store');

    // Page Register
    Route::get('/auth/register', [RegisterController::class, 'index'])->name('register');
    Route::post('/auth/register', [RegisterController::class, 'store'])->name('register.store');
});

// Profile User Setting
Route::middleware('auth')->group(function () {
    Route::get('/profile/user/settings', [ProfileController::class, 'edit'])->name('profile');
    Route::post('/profile/user/settings', [ProfileController::class, 'update'])->name('profile.update');
});

// Group khusus Customer
Route::middleware('RoleAkses:customer')->group(function () {
    Route::get('/dashboard/customer', [CustomerController::class, 'index'])->name('dashboardCustomer');
});

// Group khusus Seller
Route::middleware('RoleAkses:seller')->group(function () {
    Route::get('/dashboard/seller', [SellerController::class, 'index'])->name('dashboardSeller');
});

// Logout
Route::middleware('auth')->group(function () {
    Route::post('/logout', [LoginController::class, 'destroy'])->name('logout');
});