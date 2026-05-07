<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $userData =  [
            [
                'name' => 'Chandra Admin',
                'phone' => '082233445566',
                'role' => 'admin',
                'email' => 'admin@example.com',
                'password' => bcrypt('password'),
            ],
            [
                'name' => 'Chandra Customer',
                'phone' => '082233445577',
                'role' => 'customer',
                'email' => 'customer@example.com',
                'password' => bcrypt('password'),
            ],
            [
                'name' => 'Chandra Seller',
                'phone' => '082233445588',
                'role' => 'seller',
                'email' => 'seller@example.com',
                'password' => bcrypt('password'),
            ]
        ];

        foreach ($userData as $val) {
            User::create($val);
        }
    }
}
