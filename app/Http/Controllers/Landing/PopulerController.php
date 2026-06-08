<?php

namespace App\Http\Controllers\Landing;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class PopulerController extends Controller
{
    public function index()
    {
        return inertia('Landing/Populer');
    }
}
