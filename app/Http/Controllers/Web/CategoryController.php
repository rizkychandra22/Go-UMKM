<?php

namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;
use App\Models\Category;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    public function index()
    {
        $slug = request()->query('slug');

        return inertia('Web/Category', [
            'categories' => Category::all(),
            'slug' => $slug,
        ]);
    
    }
}
