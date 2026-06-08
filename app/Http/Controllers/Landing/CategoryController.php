<?php

namespace App\Http\Controllers\Landing;

use App\Http\Controllers\Controller;
use App\Models\Category;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    public function index($slug = null)
    {
        return inertia('Landing/Category', [
            'categories' => Category::all(),
            'slug' => $slug,
        ]);
    
    }
}
