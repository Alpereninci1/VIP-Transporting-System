<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Arac extends Model
{
    use HasFactory;
    protected $table='araclar';
    protected $fillable=[
        'marka',
        'plaka',
        'surucu',
    ];
}
