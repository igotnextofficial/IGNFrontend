<?php
  namespace App\Helpers\Bytes;
  use App\Helpers\Bytes\Bytes;
  class MegaBytes extends Bytes{
    public function __construct(){
        $this->setUnitExponent(2);
     }
  }

 ?> 