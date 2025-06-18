<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Recommendation extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'counselee_id',
        'counselor_id',
        'text',
        'for_parent',
    ];

    protected $casts = [
        'for_parent' => 'boolean',
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
