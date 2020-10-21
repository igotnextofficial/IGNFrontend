<?php
  namespace App\Helpers\Bytes;
  use App\Helpers\Bytes\Bytes;
  class TeraBytes extends Bytes{
    public function __construct(){
        $this->setUnitExponent(4);
     }
  }

 ?>