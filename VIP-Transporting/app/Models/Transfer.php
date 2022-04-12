<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Transfer extends Model
{
    use HasFactory;

    protected $table="transferler";

    public function vehicle()
    {
        return $this->belongsTo(Arac::class);
    }
    public function passenger()
    {
        return $this->belongsTo(Yolcu::class);
    }
}
