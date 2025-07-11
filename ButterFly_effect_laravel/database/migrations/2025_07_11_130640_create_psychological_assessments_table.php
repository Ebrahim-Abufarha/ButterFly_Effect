<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('psychological_assessments', function (Blueprint $table) {
            $table->id();
                $table->foreignId('seeker_id')->constrained('users');
    $table->dateTime('assessment_date');
    $table->tinyInteger('self_rating');
    $table->tinyInteger('mood_level')->nullable();
    $table->tinyInteger('anxiety_score')->nullable();
    $table->tinyInteger('depression_score')->nullable();
    $table->text('recommendation')->nullable();
    $table->string('ai_flags')->nullable();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('psychological_assessments');
    }
};
