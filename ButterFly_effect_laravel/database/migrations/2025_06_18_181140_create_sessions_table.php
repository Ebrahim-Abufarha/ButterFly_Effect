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
     Schema::create('sessions', function (Blueprint $table) {
    $table->id();
    $table->foreignId('counselee_id')->constrained('counselees');
    $table->foreignId('counselor_id')->constrained('users');
    $table->date('date');
    $table->time('time');
    $table->integer('duration')->nullable();
    $table->string('audio_url')->nullable();
    $table->longText('transcript_text')->nullable();
    $table->longText('comment')->nullable();
    $table->softDeletes();
    $table->timestamps();
});

    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('sessions');
    }
};
