<?php
 namespace App\Helpers\Bytes;
  interface BytesUnitInterface{
    /**
     * @param Integer $number
     * @param ByteUnit unit type to convert integer too.
     * @return ByteUnitInterface
     */
    public function convertTo($unit);

    /**
     * @return String - returns string of unit measurement.
    */
    public function displaySize();
  }
?>