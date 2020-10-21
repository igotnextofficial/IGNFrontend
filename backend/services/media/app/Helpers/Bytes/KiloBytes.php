<?php
  namespace App\Helpers\Bytes;
  use App\Helpers\Bytes\Bytes;
  class KiloBytes extends Bytes{
    private $unitSize;
    private $unitType;
    private $unitExponent;
    private $number;
    public function __construct(){
        parent::__construct();
        $this->setUnitExponent(1);
     }
  }

 ?>