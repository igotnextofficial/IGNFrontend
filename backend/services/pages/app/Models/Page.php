<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Page extends Model
{
    use HasFactory;

    protected $table = 'pages';

    protected $fillable = ['title','slug','display'];

    public function parent(){
        return $this->belongsToMany(Page::class,'parent_id');
    }

    public function child(){
        return $this->belongsTo(Page::class,'id');
    }

    public function content(){
        return $this->HasMany(Content::class);
    }
}
