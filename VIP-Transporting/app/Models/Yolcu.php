<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Yolcu extends Model
{
    use HasFactory;
    protected $table ='yolcular';
    protected $fillable =[
        'ad',
        'soyad',
        'numara',
        'tip',
    ];
}
