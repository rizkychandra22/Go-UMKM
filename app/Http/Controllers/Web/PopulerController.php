<?php

namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class PopulerController extends Controller
{
    public function index()
    {
        return inertia('Web/Populer');
    }
}
