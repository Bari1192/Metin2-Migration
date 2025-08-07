<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Item extends Model
{
    protected $fillable = [
        'id',
        'name',
        'price',
        'price_yang',
        'group',
        'icon',
        'quantity',
        'created_at',
        'updated_at',
    ];

    protected $casts = [
        'price_yang' => 'integer',
        'quantity' => 'integer',
        'price' => 'integer',
    ];
}
