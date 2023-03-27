<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Log;

class Content extends Model
{
    use HasFactory;
    protected $fillable = ['description','status'];

    public function page(){
        return $this->belongsTo(Page::class);
    }
}
