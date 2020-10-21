<?php
  namespace App\Helpers\Bytes;
  use App\Helpers\Bytes\ByteUnit;
  use App\Helpers\Bytes\KiloBytes;
  use App\Helpers\Bytes\MegaBytes;
  use App\Helpers\Bytes\GigaBytes;
  use App\Helpers\Bytes\TeraBytes;

  class Bytes extends ByteUnit{
   
    function __construct(){
       $this->setUnitType();
     }


     public static function getUnitTypeClass($unittype = ""){
       $lowerCaseUnitType =  strtolower($unittype);

       if($lowerCaseUnitType == "kb" || $lowerCaseUnitType == "kilobytes"){
         return new KiloBytes();
       }

       if($lowerCaseUnitType == "mb" || $lowerCaseUnitType == "megabytes"){
        return new MegaBytes();
      }

      if($lowerCaseUnitType == "gb" || $lowerCaseUnitType == "gigabytes"){
        return new GigaBytes();
      }

      if($lowerCaseUnitType == "tb" || $lowerCaseUnitType == "terabytes"){
        return new TeraBytes();
      }

      return new Bytes();
     }

     public function hello(){return "hello";}
  }

 ?>