<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('items', function (Blueprint $table) {
            $table->id();
            $table->string('name')->unique();
            $table->unsignedInteger('price_yang')->default(0);
            $table->string('group')->nullable();
            $table->string('icon')->nullable();
            $table->unsignedInteger('quantity')->default(1);;
            $table->unsignedInteger('price')->default(0);; 
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('items');
    }
};