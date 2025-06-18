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
      Schema::create('recommendations', function (Blueprint $table) {
    $table->id();
    $table->foreignId('counselee_id')->constrained('counselees');
    $table->foreignId('counselor_id')->constrained('users');
    $table->text('text');
    $table->boolean('for_parent')->default(false);
    $table->softDeletes();
    $table->timestamps();
});

    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('recommendations');
    }
};
