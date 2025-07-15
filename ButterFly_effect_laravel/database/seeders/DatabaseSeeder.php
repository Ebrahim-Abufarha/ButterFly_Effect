<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        $seekerId = DB::table('users')->insertGetId([
            'name' => 'Ali Seeker',
            'email' => 'seeker@example.com',
            'password' => Hash::make('password'),
            'user_type' => 'seeker',
            'gender' => 'male',
            'age' => 17,
            'nationality' => 'Palestinian',
            'residence' => 'Ramallah',
            'education_level' => 'High School',
            'marital_status' => 'single',
            'employment_status' => 'student',
            'income_range' => 'low',
            'has_prior_support' => true,
            'remember_token' => Str::random(10),
        ]);

        $counselorId = DB::table('users')->insertGetId([
            'name' => 'Dr. Lina Counselor',
            'email' => 'counselor@example.com',
            'password' => Hash::make('password'),
            'user_type' => 'counselor',
            'gender' => 'female',
            'age' => 34,
            'nationality' => 'Jordanian',
            'residence' => 'Amman',
            'education_level' => 'PhD',
            'marital_status' => 'married',
            'employment_status' => 'employed',
            'income_range' => 'high',
            'has_prior_support' => false,
            'remember_token' => Str::random(10),
        ]);

        $institutionAdminId = DB::table('users')->insertGetId([
            'name' => 'Institution Admin',
            'email' => 'admin@institution.com',
            'password' => Hash::make('password'),
            'user_type' => 'institution_admin',
            'gender' => 'male',
            'age' => 40,
            'nationality' => 'Palestinian',
            'residence' => 'Hebron',
            'education_level' => 'Master',
            'marital_status' => 'married',
            'employment_status' => 'employed',
            'income_range' => 'medium',
            'has_prior_support' => false,
            'remember_token' => Str::random(10),
        ]);
$superAdminId = DB::table('users')->insertGetId([
    'name' => 'Super Admin',
    'email' => 'superadmin@example.com',
    'password' => Hash::make('password'),
    'user_type' => 'super_admin',
    'gender' => 'male',
    'age' => 38,
    'nationality' => 'Palestinian',
    'residence' => 'Nablus',
    'education_level' => 'PhD',
    'marital_status' => 'single',
    'employment_status' => 'employed',
    'income_range' => 'high',
    'has_prior_support' => false,
    'remember_token' => Str::random(10),
]);

        $institutionId = DB::table('institutions')->insertGetId([
            'name' => 'Hope Mental Health Center',
            'sector' => 'non_profit',
            'mental_health_policy' => 'Policy about mental health support and confidentiality.',
            'user_id' => $institutionAdminId,
        ]);

        DB::table('sessions')->insert([
            'seeker_id' => $seekerId,
            'counselor_id' => $counselorId,
            'session_date' => now()->addDays(2),
            'duration_minutes' => 60,
            'topic' => 'Managing Anxiety',
            'session_type' => 'individual',
            'notes' => 'Seeker expressed improvement.',
        ]);

        DB::table('psychological_assessments')->insert([
            'seeker_id' => $seekerId,
            'assessment_date' => now(),
            'self_rating' => 7,
            'mood_level' => 5,
            'anxiety_score' => 6,
            'depression_score' => 3,
            'recommendation' => 'Continue weekly sessions.',
            'ai_flags' => 'low_anxiety',
        ]);

        $parentId = DB::table('users')->insertGetId([
            'name' => 'Parent of Ali',
            'email' => 'parent@example.com',
            'password' => Hash::make('password'),
            'user_type' => 'parent',
            'gender' => 'female',
            'age' => 45,
            'nationality' => 'Palestinian',
            'residence' => 'Ramallah',
            'education_level' => 'Bachelor',
            'marital_status' => 'married',
            'employment_status' => 'employed',
            'income_range' => 'medium',
            'has_prior_support' => false,
            'remember_token' => Str::random(10),
        ]);

        DB::table('parents')->insert([
            'user_id' => $parentId,
            'child_id' => $seekerId,
        ]);

        DB::table('financial_transactions')->insert([
            'payer_type' => 'seeker',
            'payer_id' => $seekerId,
            'amount' => 150.00,
            'service_type' => 'session',
            'payment_date' => now(),
            'notes' => 'Paid in full before session.',
        ]);
    }
}
