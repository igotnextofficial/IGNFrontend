<?php

namespace App;
use App\User;
use Illuminate\Database\Eloquent\Model;

class Artist extends User
{
    public function User()
    {
        return $this->belongsTo(User);
    }
}
