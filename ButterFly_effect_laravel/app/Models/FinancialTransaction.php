<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FinancialTransaction extends Model
{
    use HasFactory;

    protected $fillable = [
        'payer_type', 'payer_id', 'amount', 'service_type', 'payment_date', 'notes'
    ];
}
