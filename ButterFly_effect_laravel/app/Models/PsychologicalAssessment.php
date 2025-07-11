<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PsychologicalAssessment extends Model
{
    use HasFactory;

    protected $fillable = [
        'seeker_id', 'assessment_date', 'self_rating', 'mood_level',
        'anxiety_score', 'depression_score', 'recommendation', 'ai_flags'
    ];

    public function seeker()
    {
        return $this->belongsTo(User::class, 'seeker_id');
    }
}
