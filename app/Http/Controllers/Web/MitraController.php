<?php

namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;

class MitraController extends Controller
{
    public function index()
    {
        $mitraData = User::where('role', 'seller')
            ->select('id', 'name', 'phone', 'image', 'address')
            ->with(['mitra' => function($query) {
                $query->select('id', 'user_id', 'business', 'description', 'image'); 
            }])
            ->latest()
            ->get();

        return inertia('Web/Mitra', [
            'userMitra' => $mitraData
        ]);
    }
}
