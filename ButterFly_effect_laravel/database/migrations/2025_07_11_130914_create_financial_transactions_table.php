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
        Schema::create('financial_transactions', function (Blueprint $table) {
            $table->id();
                $table->enum('payer_type', ['seeker', 'institution']);
    $table->unsignedBigInteger('payer_id');
    $table->decimal('amount', 10, 2);
    $table->string('service_type'); // session, subscription, training
    $table->dateTime('payment_date');
    $table->text('notes')->nullable();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('financial_transactions');
    }
};
