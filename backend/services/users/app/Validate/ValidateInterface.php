<?php 
namespace App\Validate;
interface ValidateInterface{
   /**
    * returns a completely validated object.
    * @params Void
    * @return Mixed
    */
    public function validate();
}

?>