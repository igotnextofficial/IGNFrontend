<?php
namespace App\Services;
use Jbuapim\Crudster\Crudster;
use App\Models\Page;

class PageService extends Crudster{
    public function __construct()
    {
      parent::__construct(new Page());
      $this->attachResource('App\Http\Resources\PageResource');
    }
}