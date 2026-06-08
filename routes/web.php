<?php

use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\Auth\ProfileController;
use App\Http\Controllers\Auth\ProfileBusinessController;
use App\Http\Controllers\Auth\RegisterController;
use App\Http\Controllers\Dashboard\CustomerController;
use App\Http\Controllers\Dashboard\SellerController;
use App\Http\Controllers\Landing\CategoryController;
use App\Http\Controllers\Landing\HomeController;
use App\Http\Controllers\Landing\MitraController;
use App\Http\Controllers\Landing\PopulerController;
use App\Http\Controllers\Landing\ProductController;
use Illuminate\Support\Facades\Route;

Route::get('/', [HomeController::class, 'index'])->name('home');
Route::get('/category/{slug}', [CategoryController::class, 'index'])->name('category');
Route::get('/populer', [PopulerController::class, 'index'])->name('populer');
Route::get('/product', [ProductController::class, 'index'])->name('product');
Route::get('/mitra', [MitraController::class, 'index'])->name('mitra');

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
    Route::get('/profile/business/settings', [ProfileBusinessController::class, 'edit'])->name('profile.business');
    Route::post('/profile/business/settings', [ProfileBusinessController::class, 'update'])->name('profile.business.update');
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