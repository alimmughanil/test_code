<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // \App\Models\User::factory(10)->create();

        \App\Models\User::create([
            'name' => 'Alim Mughanil Karim',
            'email' => 'alim.mughanil23@gmail.com',
            'password' => Hash::make('rahasia123'),
            'remember_token' => "123456789123"
        ]);
    }
}