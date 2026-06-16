<?php

namespace App\Http\Controllers\Landing;

use App\Http\Controllers\Controller;
use Inertia\Inertia;

class ProductController extends Controller
{
    public function show($id)
    {
        // Cukup kirim ID produk saja ke front-end
        return Inertia::render('Landing/ProductDetail', [
            'productId' => (int) $id
        ]);
    }
}