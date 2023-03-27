<?php
namespace App\Services;
use Jbuapim\Crudster\Crudster;
use App\Models\Content;

class ContentService extends Crudster{
    public function __construct()
    {
      parent::__construct(new Content());
    //   $this->attachResource('App\Http\Resources\PageResource');
    }
}