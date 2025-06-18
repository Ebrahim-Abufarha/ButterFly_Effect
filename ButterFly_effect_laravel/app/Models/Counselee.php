<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Counselee extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'user_id',
        'parent_id',
        'counselor_id',
        'birth_date',
    ];

    protected $dates = [
        'birth_date',
    ];

    // User info of the counselee
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    // Parent user (if exists)
    public function parent()
    {
        return $this->belongsTo(User::class, 'parent_id');
    }

    // Counselor user
    public function counselor()
    {
        return $this->belongsTo(User::class, 'counselor_id');
    }

    // Recommendations for this counselee
    public function recommendations()
    {
        return $this->hasMany(Recommendation::class);
    }

    // Sessions for this counselee
    public function sessions()
    {
        return $this->hasMany(Session::class);
    }
}
