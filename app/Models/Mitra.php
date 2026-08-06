<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Mitra extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'business',
        'description',
        'review',
        'image',
    ];

    // Relasi ke table induk users
    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    // Relasi ke table anak products
    public function products()
    {
        return $this->hasMany(Product::class, 'mitra_id');
    }
}
