<?php
namespace App\Validation;

use App\Validation\Validations;
use App\Concrete\MediaBase;
use App\Settings\BaseSettings;
use App\Messages;

class MediaValidation extends Validations{
    private $Media = null;

    public function __construct($error){
      parent::__construct($error);
    }
     
    public function isCorrectSize(int $inputSize, int $expectedSize, bool $checkForMinimum = false){
     
      return !($checkForMinimum) ? $inputSize <= $expectedSize : $inputSize >= $expectedSize;
    }

    public function isCorrectType(string $inputType, array $expectedTypes){
      return in_array($inputType, $expectedTypes);
    }

    public function process(MediaBase $media, BaseSettings $settings){
      $this->isCorrectSize($media->getSize(),$settings->getMaximumFileSize()) ? "" : $this->reportAnalysis("maximumFileSize");
      $this->isCorrectSize($media->getSize(),$settings->getMinimumFileSize(),true) ? "" : $this->reportAnalysis("minimumFileSize");
      $this->isCorrectType($media->getType(),$settings->getValidTypes()) ? "" : $this->reportAnalysis("validTypes","image",true);
      
     
    }

    public function reportAnalysis($item = "", $item2 = "", $checkForSecondItem = false){
      $message = Messages::Display($item,$item2,$checkForSecondItem);
      $name = $item;
      $this->addError(["name" => $item,"message" => $message]);
    
    }
  }
  

?>