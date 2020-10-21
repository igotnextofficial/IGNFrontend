<?php
  namespace App\Helpers\Bytes;
  use App\Helpers\Bytes\Bytes;
  class GigaBytes extends Bytes{
    public function __construct(){
        $this->setUnitExponent(3);
     }
  }

 ?>