<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Institution extends Model
{
    use HasFactory;

    protected $fillable = [
        'name', 'sector', 'number_of_employees', 'mental_health_policy', 'user_id'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
