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
                $table->foreignId('seeker_id')->constrained('users');
    $table->foreignId('counselor_id')->constrained('users');
    $table->dateTime('session_date');
    $table->integer('duration_minutes');
    $table->string('topic');
    $table->enum('session_type', ['individual', 'group', 'emergency']);
    $table->text('notes')->nullable();

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
