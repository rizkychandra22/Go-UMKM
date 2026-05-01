<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Home');
})->name('home');

Route::get('/dashboard/customer', function () {
    return Inertia::render('Dashboard/Customer');
})->name('dashboardCustomer');

Route::get('/dashboard/seller', function () {
    return Inertia::render('Dashboard/Seller');
})->name('dashboardSeller');
