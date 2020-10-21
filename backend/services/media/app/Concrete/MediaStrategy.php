<?php
namespace App\Concrete;
use App\Settings\BaseSettings;
use App\Validation\Validations;
use App\Errors\Errors;
class MediaStrategy{
    private $Media;
    private $Settings;
    private $Validation;
    private $Errors;

  function __construct(MediaBase $media, BaseSettings $settings , Validations $validation, Errors $error){
    $this->setMedia($media); //media object that was uploaded with its original settings.
    $this->setsettings($settings); //Settings/rules of what the media object should have.
    $this->setValidation($validation); 
    $this->setErrors($error);
  }  
  
  private function setMedia($media){
    if($this->Media !== null || $media == null){return false;} 
    $this->Media = $media; 
  }

  private function setSettings($settings){
    if($this->Settings !== null || $settings == null){return false;} 
    $this->Settings = $settings; 
  }

  private function setValidation($validation){
 
    // if($this->Validation !== null || $validation == null){return false;} 
    $this->Validation = $validation; 

  }

  private function getValidation(){
    return $this->Validation;
  }

  private function setErrors($errors){
    if($this->Errors !== null || $errors == null){return false;} 
    $this->Errors = $errors; 
  }
  private function validateSettings(){
    // should pass the media object and the settings object to the validation object and begin comparison analysis
    $this->Validation->process($this->Media,$this->Settings);
    return !($this->Validation->validate());
  }

  protected function isValidMinimumFileSize(){
    $expectedSize = $this->Settings->getMaximumFileSize(); 
    $inputSize = null;
    $validSize = $this->Valdiation->isCorrectSize($inputSize, $expectedSize,true);
   !(validSize) ? $this->addError('invalidFileSize', "The size cannot be less than {$expectedSize}") : ""; 
  }

  protected function isValidMaximumFileSize(){
     $expectedSize = $this->Settings->getMaximumFileSize(); 
     $inputSize = null;
     $validSize = $this->Valdiation->isCorrectSize($inputSize, $expectedSize);
    !(validSize) ? $this->addError('invalidFileSize', "The size cannot be greater than {$expectedSize}") : ""; 
  }

  public function isCorrectType($type){
    $expectedTypes = $this->Settings->getExpectedTypes();
    $inputType = $this->Media->getType();
    $validType = $this->Validation->isCorrectType($type,$expectedTypes);
    $validTypes = implode(",",$expectedTypes);
    !($validType) ? $this->addError("inValidType","Types must be one of the following {$validTypes} ") : "";
    return $this;
  }

  protected function addError($key,$msg){
    $this->Errors->add($key,$msg);
  }
  
  public function Validate(){
     $this->isValidMinimumFileSize()->isValidMaximumFileSize()->isCorrectType();
  }

  private function showErrorsOrPass(){
    $output = $this->Errors->hasError() ? $this->Errors->display() : ["errors"=> "passed"] ;
    return $output;
  }

  public function init(){
     return !$this->ValidateSettings() ? json_encode(["Errors"=>$this->Validation->getErrors()]) : json_encode(["saved" => $this->Media->save()]) ;
    // $this->Validation->process($this->media,$this->Settings); // validate that media object abides by the settings
    //   $this->showErrorsOrPass();
  }

}

?> 