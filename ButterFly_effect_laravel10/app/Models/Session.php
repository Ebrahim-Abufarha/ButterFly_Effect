<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Session extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'counselee_id',
        'counselor_id',
        'date',
        'time',
        'duration',
        'audio_url',
        'transcript_text',
        'comment',
    ];

    protected $dates = [
        'date',
    ];

    public function counselee()
    {
        return $this->belongsTo(Counselee::class);
    }

    public function counselor()
    {
        return $this->belongsTo(User::class, 'counselor_id');
    }
}
