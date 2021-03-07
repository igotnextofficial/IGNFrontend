<?php
namespace App\Validation;

use App\Validation\Validators;
use App\Errors\Errors;

 class Validations implements Validators{
    public $errors;
    public function __construct(Errors $error){
      $this->errors = $error;
    }

    public function validate(){
        return $this->errors->hasError() ;
    }

    protected function addError($error=[]){
      $this->errors->add($error['name'],$error['message']);
    }

    public function getErrors(){
        return $this->errors->display();
    }
}

?>