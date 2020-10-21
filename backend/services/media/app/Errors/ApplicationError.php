<?php
  namespace App\Errors;
  class ApplicationError implements Errors{

    private $errors = [];
    
     public function hasError(){
       return count($this->errors) > 0 ? true : false;
     }

     private function logError(){
         return false;
     }

     public function add($key = "",$message = ""){
         if(trim($key) !== "" && trim($message) !== ""){
           array_push($this->errors, [$key => $message]);
         }
         
     }

     public function display(){
         return $this->errors ;
     }
 }

?>