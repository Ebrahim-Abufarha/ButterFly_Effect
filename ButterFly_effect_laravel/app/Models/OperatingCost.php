<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class OperatingCost extends Model
{
    use HasFactory;

    protected $fillable = [
        'cost_type', 'amount', 'cost_date', 'notes'
    ];
}
