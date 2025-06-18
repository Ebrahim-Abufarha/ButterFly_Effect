<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class DatabaseSeeder extends Seeder
{
    public function run()
    {

    $institutionId = DB::table('institutions')->insertGetId([
    'name' => 'Default Institution',
    'address' => '123 Main St',
    'contact_info' => '0123456789',
    'status' => true,
    'created_at' => now(),
    'updated_at' => now(),
]);



        DB::table('users')->insert([
            [
               'name' => 'Super Admin User',
            'email' => 'superadmin@example.com',
            'phone' => '0500000001',
            'password' => Hash::make('password123'),
            'role' => 'super_admin',
            'institution_id' => $institutionId,
            'created_at' => now(),
            'updated_at' => now(),
            ],
            [
                'name' => 'Institution Account',
            'email' => 'institution@example.com',
            'phone' => '0500000002',
            'password' => Hash::make('password123'),
            'role' => 'institution',
            'institution_id' => $institutionId,
            'created_at' => now(),
            'updated_at' => now(),
            ],
            [
                   'name' => 'Counselor User',
            'email' => 'counselor@example.com',
            'phone' => '0500000003',
            'password' => Hash::make('password123'),
            'role' => 'counselor',
            'institution_id' => $institutionId,
            'created_at' => now(),
            'updated_at' => now(),
            ],
            
            [
                      'name' => 'Parent User',
            'email' => 'parent@example.com',
            'phone' => '0500000004',
            'password' => Hash::make('password123'),
            'role' => 'parent',
            'institution_id' => $institutionId,
            'created_at' => now(),
            'updated_at' => now(),
            ],
            [
             'name' => 'Counselee User',
            'email' => 'counselee@example.com',
            'phone' => '0500000005',
            'password' => Hash::make('password123'),
            'role' => 'counselee',
            'institution_id' => $institutionId,
            'created_at' => now(),
            'updated_at' => now(),
                        ],

        ]);

        DB::table('counselees')->insert([
            [
                'user_id' => 3,  // user_id for counselee
                'parent_id' => 2, // parent user id
                'counselor_id' => 1, // counselor user id
                'birth_date' => '2010-06-01',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);


        DB::table('users')->where('id', 2)->update([
            'counselee_id_if_parent' => 1,
        ]);

        DB::table('recommendations')->insert([
            [
                'counselee_id' => 1,
                'counselor_id' => 1,
                'text' => 'Recommendation for counselee.',
                'for_parent' => false,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);

        DB::table('sessions')->insert([
            [
                'counselee_id' => 1,
                'counselor_id' => 1,
                'date' => now()->toDateString(),
                'time' => now()->toTimeString(),
                'duration' => 60,
                'audio_url' => null,
                'transcript_text' => null,
                'comment' => 'Session comment.',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);

        DB::table('messages')->insert([
            [
                'from_user_id' => 1,
                'to_user_id' => 3,
                'message' => 'Hello, how are you?',
                'seen' => false,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);

        DB::table('notifications')->insert([
            [
                'user_id' => 3,
                'type' => 'info',
                'content' => 'You have a new message.',
                'read' => false,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
