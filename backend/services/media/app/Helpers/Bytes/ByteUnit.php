<?php 
  namespace App\Helpers\Bytes;
  use App\Helpers\Bytes\BytesUnitInterface;

  
  

  class ByteUnit implements BytesUnitInterface{

     private $unitSize;
     private $unitType;
     private $unitExponent;
     private $number;
     
     function __construct(){
        // echo get_class($this) . " constructor";
        //  $this->setUnitType();
     }

     protected function setUnitType(){
         $nameOfClass =  get_class($this);
         $startPosition = strlen($nameOfClass);
         
         $this->unitType = substr($nameOfClass,$startPosition - 9);
     }

     public function getUnitType(){
         return $this->unitType;
     }

     public function setUnitSize($number = 0){
         $this->unitSize = $number;
         return $this;
     }

     public function getUnitSize(){
         return $this->unitSize;
     }

     public function unitSizeInBytes(){
        return pow(1024,$this->unitExponent) * $this->unitSize;
     }


     protected function unitTypeAbbreviation(){
         return $this->getUnitType()[0] . $this->getUnitType()[4];
     }

     public function convertTo($unit){ // will delete this function
        return pow(1024,$this->unitExponent) * $this->unitSize;
     }
       
     protected function setUnitExponent($exponent = 0){
       $this->unitExponent = $exponent;
     }

     public function displaySize(){
       return $this->getUnitSize() ." ". $this->unitTypeAbbreviation();
     }

    
  }