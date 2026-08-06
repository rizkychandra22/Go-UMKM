<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $categories = [
            [
                'name' => 'Kuliner Lokal',
                'slug' => 'kuliner-lokal',
                'description' => 'Jelajahi cita rasa otentik dari camilan khas daerah hingga minuman artisan pilihan.'
            ],
            [
                'name' => 'Trending Fashion',
                'slug' => 'trending-fashion',
                'description' => 'Tampil gaya dengan sentuhan budaya: dari batik kontemporer hingga aksesori handmade eksklusif.'
            ],
            [
                'name' => 'Rumah & Dekor',
                'slug' => 'rumah-dekor',
                'description' => 'Ciptakan sudut estetik dengan kerajinan tangan lokal yang menghangatkan suasana rumah.'
            ],
            [
                'name' => 'Kebutuhan Harian',
                'slug' => 'kebutuhan-harian',
                'description' => 'Penuhi kebutuhan harian keluarga dengan produk lokal berkualitas tinggi yang terjamin kesegarannya.'
            ],
        ];

        Category::insert($categories);
    }
}
