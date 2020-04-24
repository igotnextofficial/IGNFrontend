<?php

namespace App;
use App\User;

use Illuminate\Database\Eloquent\Model;

class Staff extends User
{
    public function User()
    {
        return $this->belongsTo(User);
    }
}
