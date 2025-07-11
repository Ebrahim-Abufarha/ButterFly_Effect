<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ParentM extends Model
{
    use HasFactory;

    protected $table = 'parents';

    protected $fillable = ['user_id', 'child_id'];

    public function parent()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function child()
    {
        return $this->belongsTo(User::class, 'child_id');
    }
}
