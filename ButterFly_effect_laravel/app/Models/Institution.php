<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Institution extends Model
{
    use HasFactory;

    protected $fillable = [
        'name', 'sector','mental_health_policy', 'number_of_employees', 'user_id'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
