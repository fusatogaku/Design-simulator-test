<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Item extends Model
{
    use HasFactory;
    // テーブル名
    protected $table = 'items';

    // 可変項目
    protected $fillable = 
    [
        'itemName',
        'itemCategory',
        'itemColor',
    ];
}
