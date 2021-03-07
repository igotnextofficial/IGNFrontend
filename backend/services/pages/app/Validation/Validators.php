<?php 
namespace App\Validation;

interface Validators{
    /**
     * 
     * @return Boolean - returns boolean value if item passes validation returns true if not false. 
     * */  
    public function validate();    
  }
  
?>