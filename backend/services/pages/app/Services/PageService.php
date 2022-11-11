<?php
namespace App\Services;
use Jbuapim\Crudster\Crudster;
use App\Models\pages;

class PageService extends Crudster{
    public function __construct()
    {
      parent::__construct(new pages());
      $this->attachResource('App\Http\Resources\PageResource');
    }
}