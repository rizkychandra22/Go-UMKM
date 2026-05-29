<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class Product extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'mitra_id',
        'category_id',
        'product_name',
        'slug',
        'description',
        'image',
        'is_active',
    ];

    // Relasi ke table induk mitra
    public function mitra(): BelongsTo
    {
        return $this->belongsTo(Mitra::class, 'mitra_id');
    }

    // Relasi ke table induk category
    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class, 'category_id');
    }

    // Relasi ke table anak varaiants
    public function variants(): HasMany  
    {
        return $this->hasMany(ProductVariant::class, 'product_id');
    }

    // Relasi ke table anak images
    public function images(): HasMany
    {
        return $this->hasMany(ProductImage::class, 'product_id');
    }
}
