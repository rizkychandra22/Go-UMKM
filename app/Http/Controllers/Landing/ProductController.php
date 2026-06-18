<?php

namespace App\Http\Controllers\Landing;

use App\Http\Controllers\Controller;
use Inertia\Inertia;

class ProductController extends Controller
{
    public function index()
    {
        return Inertia::render('Landing/Product');
    }

    public function show($slug)
    {
        return Inertia::render('Landing/ProductDetail', [
            'productSlug' => $slug
        ]);
    }
}