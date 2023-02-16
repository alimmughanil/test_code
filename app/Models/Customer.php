<?php

namespace App\Models;

use App\Models\Phone;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Customer extends Model
{
    use HasFactory;
    protected $guarded = [];
    protected $with = ['phone'];

    public function phone()
    {
        return $this->hasMany(Phone::class, 'customer_id', 'id');
    }
}