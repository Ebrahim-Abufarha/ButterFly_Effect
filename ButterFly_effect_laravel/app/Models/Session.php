<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Session extends Model
{
    use HasFactory;

    protected $fillable = [
        'seeker_id', 'counselor_id', 'session_date', 'duration_minutes', 'topic',
        'session_type', 'notes'
    ];

    public function seeker()
    {
        return $this->belongsTo(User::class, 'seeker_id');
    }

    public function counselor()
    {
        return $this->belongsTo(User::class, 'counselor_id');
    }
}
