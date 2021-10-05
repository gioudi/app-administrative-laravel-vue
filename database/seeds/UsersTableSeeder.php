<?php

use Illuminate\Database\Seeder;
use App\User;
class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        User::create([
            'username' => 'Sergio Penagos',
            'email' => 'tipouno@dae.com',
            'password' => bcrypt('password')
        ]);
       User::create([
         'username' => 'Hardik Savani',
         'email' => 'admin@gmail.com',
         'password' => bcrypt('123456')
         ]);
    }
}
