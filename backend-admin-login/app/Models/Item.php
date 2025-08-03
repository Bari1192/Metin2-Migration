<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Item extends Model
{
    protected $fillable = [
        'name',
        'price_yang',
        'group',
        'icon',
        'quantity',
        'price'
    ];

    protected $casts = [
        'price_yang' => 'integer',
        'quantity' => 'integer',
        'price' => 'integer',
    ];
}
