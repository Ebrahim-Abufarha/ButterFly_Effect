<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable
{
    use HasFactory;

    protected $fillable = [
        'full_name', 'email', 'password', 'user_type', 'gender', 'age',
        'nationality', 'residence', 'education_level', 'marital_status',
        'employment_status', 'income_range', 'has_prior_support'
    ];

    protected $hidden = ['password', 'remember_token'];

    public function institution()
    {
        return $this->hasOne(Institution::class);
    }

    public function sessionsAsSeeker()
    {
        return $this->hasMany(Session::class, 'seeker_id');
    }

    public function sessionsAsCounselor()
    {
        return $this->hasMany(Session::class, 'counselor_id');
    }

    public function assessments()
    {
        return $this->hasMany(PsychologicalAssessment::class, 'seeker_id');
    }

    public function children()
    {
        return $this->hasMany(ParentM::class, 'user_id');
    }

    public function parents()
    {
        return $this->hasMany(ParentM::class, 'child_id');
    }
}
