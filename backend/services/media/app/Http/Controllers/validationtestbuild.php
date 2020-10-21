<?php 

interface Validatior{

  /**
   * 
   * @return Boolean - returns boolean value if item passes validation returns true if not false. 
   * */  

  public function validate();    
}


abstract class Validation implements Validator{
    private $errors;
    public function __construct(Errors $error){
      $this->errors = $error;
    }

    public function validate(){
        return $this->errors->hasError();
    }

    protected function addError($error=[]){
        $this->errors->add($error['name'],$error['$message']);
    }
}

class MediaValidation extends Validation{
  protected $potentialErrors = [];

  private function defaultPotentialErrors(){
      $this->setPotentialErrors("large-file","Media size is too large")
      ->setPotentialErrors("small-file","The media size is too small")
      ->setPotentialErrors("type","The media Type is incorrect must be a valid type")
      ->setPotentialErrors("unexpected","we ran into an unxpected error, please check your file and try again.")
      ->setPotentialErrors("upload-limit","Daily upload limit reached");
      
  }

  protected function setPotentialErrors($errorName = "",$errorMessage = ""){
      if(trim($errorName) !== "" && trim($errprMessage) !== ""){
          $this->potentialErrors[$errorName] = $errorMessage;
      }  
      return $this;
  }
  
  protected function fileTooLarge($inputSize,$maxSize){
    $isValid = false;
     if ( $inputSize >= $maxSize ) {
       $this->addError($this->potentialErrors['large-file']);
       $isValid = true;
     }
      return $this;
  } 

  protected function fileTooSmall($inputSize,$maxSize){
      $isValid = false;
      if ( $inputSize <= $minSize ) {
        $this->addError($this->potentialErrors['small-file']);
        $isValid = true;
      }
      return $isValid;
  }
  

  public function isCorrectSize($inputSize,$maxSize){
    $this->fileTooLarge();
    $this->fileTooSmall();
    return $this;
  }
 
  public function isCorrectType($inputType, $validType)  {
    $inputType !== $validType ? $this->errors->add($this->potentialErrors['type']) : "";
    return $this;
  }
}



  interface Errors{
      public function displayError();
   /**
        * @return Boolean - return true if their is an error
        */
      public function hasError();
      public function add();

      public function display();

  }

  class ApplicationError implements Errors{

     private $errors = [];
     
      public function hasErrors(){
        return count($errors) > 0 ? true : false;
      }

      private function logError(){
          return false;
      }

      public function add($key = "",$message = ""){
          if(trim($key) !== "" && trim($message) !== ""){
            $this->errors[$key] = $message;
          }
      }

      public function display(){
          return $this->errors ;
      }
  }
  
?>