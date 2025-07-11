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
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('email')->unique();
            $table->timestamp('email_verified_at')->nullable();
            $table->string('password');

            $table->enum('user_type', ['seeker', 'counselor', 'institution_admin', 'super_admin', 'finance_manager', 'parent']);
            $table->string('gender')->nullable();
            $table->integer('age')->nullable();
            $table->string('nationality')->nullable();
            $table->string('residence')->nullable();
            $table->string('education_level')->nullable(); 
            $table->string('marital_status')->nullable();
            $table->string('employment_status')->nullable();
            $table->string('income_range')->nullable();
            $table->boolean('has_prior_support')->default(false);

            $table->rememberToken();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('users');
    }
};
