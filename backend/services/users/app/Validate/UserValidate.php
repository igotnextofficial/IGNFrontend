<?php
namespace App\Validate;
use App\Validate\ValidateInterface;

class UserValidate implements ValidateInterface{

    private $currentValue = "";
    private $currentKey = "";
    private $data = [];
    private $errorMessage = "";
    private $errors = [];

    public function __construct($data = []){
        $this->data =  $data;
        
    }
    
    public function firstname($firstname = "firstname"){
        if( !($this->keyIsSet($firstname)) ){ return $this; }
        $this->currentKey = $firstname;
        $this->currentValue = $this->setCurrentValue($this->data[$firstname]);
        $this->checkLength(2,20,true);
        $this->removeTags();
        $this->updateCleanData();
        return $this;
    }

    public function lastname($lastname = "lastname"){
        if( !($this->keyIsSet($lastname)) ){ return $this; }
        $this->currentKey = $lastname;
        $this->currentValue = $this->setCurrentValue($this->data[$lastname]);
        $this->checkLength(2,30,true);
        $this->removeTags();
        $this->updateCleanData();
        return $this;
    }

    public function username($username = "username"){
        if( !($this->keyIsSet($username)) ){ return $this; }
        $this->currentKey = $username;
        $this->currentValue = $this->setCurrentValue($this->data[$username]);
        $this->checkLength(2,30,true);
        $this->removeTags();
        $this->updateCleanData();
        return $this;
    }

    public function email($email = "email"){
        if( !($this->keyIsSet($email)) ){ return $this; }
        $this->currentKey = $email;
        $this->currentValue = $this->setCurrentValue($this->data[$email]);
        $this->legitEmail(); 
        $this->updateCleanData();
        return $this;
    }
    
    public function userType($user_type = "user_type"){
        $this->currentKey = $user_type;
        $this->currentValue = $this->setCurrentValue($this->data[$user_type]);
        $valid_types = ["artist","user","staff"];
        $this->legitUserType($valid_types);
        $this->updateCleanData();
        return $this;
    }

    private function setCurrentValue($value = ""){
      return isset($value) ? $value : "";
    }
    
    private function setErrorMessage($msg = ""){
        $this->errorMessage = $msg;
    }
    
    
    private function hasValue(){
      $this->setErrorMessage("[$this->currentKey] cannot be blank");
      if ( trim($this->currentValue)  == ""){
        $this->addError();
      } 
      return $this;
    }
    
   private function keyIsSet($key){
     return isset($this->data[$key]) ? true : false;
   }

    private function removeTags(){
        $this->currentValue = strip_tags($this->currentValue);
        return $this;
    }

    private function checkLength($minimum = 0, $maximum = 10, $inclusive = false){
       $this->setErrorMessage("[$this->currentKey] must be between [$minimum] and [$maximum]");

       $lengthOfValue = strlen($this->currentValue);
       $isMaximumLength  = $inclusive !== false ? $lengthOfValue <= $maximum : $lengthOfValue < $maximum;
       $isMinimumLength = $lengthOfValue > $minimum;
       if ( !($isMinimumLength && $isMaximumLength  )){
         $this->addError();   
       } 
        return $this;
    }
    private function cleanRemoveSpaces(){
      $this->currentValue = trim($this->currentValue);
      return $this;
    }

    private function legitEmail(){
        $this->setErrorMessage("[$this->currentValue] is not a valid email address");
        $sanitizedEmail = filter_var($this->currentValue,FILTER_SANITIZE_EMAIL);
        !filter_var($sanitizedEmail,FILTER_VALIDATE_EMAIL) ? $this->addError() : $this->setCurrentValue($sanitizedEmail) ;
        return $this;
    }
    private function legitUserType($validTypes = array(), $default = "user"){
        $this->currentValue = !in_array($this->currentValue,$validTypes) ? $default : $this->currentValue;
        return $this;
    }


    private function addError(){
      array_push($this->errors,[$this->currentKey => $this->errorMessage ]);
    }
    
    public function getErrors(){
        return $this->errors;
    }

    private function updateCleanData(){
        $this->cleanData[$this->currentKey] = $this->currentValue;
    }
    
    public function validate(){
        // return json_encode(["data" => $this->data]);
        $this->username()->firstname()->lastname()->email()->userType();
        return empty($this->errors) ? true : false;
    }
} 
?>