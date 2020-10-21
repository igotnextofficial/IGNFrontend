<?php
namespace App\Settings;
use App\Settings\settings;
use App\Settings\ImageSettings;
use App\Helpers\Bytes\BytesUnitInterface;


class BaseSettings implements Settings{
    protected $settings = array("settings" => []);
    protected $Bytes;
    protected $validTypes = [];
     
   public function __construct(BytesUnitInterface $Bytes){
        $this->Bytes  = $Bytes;
    }

    public function getValidTypes(){
        return $this->validTypes;
    }

    protected function setValidTypes($type = ""){
        if(trim($type) !== ""){array_push($this->validTypes,$type);}
        return $this;
    }

    protected function addSetting($name = "", $value = ""){
        if(!$this->settingExists($name)){
          $this->settings['settings'][$name]=$value;
        }
    }

    protected function settingExists($name){
      return array_key_exists($name,$this->settings['settings']);
    }
    
    protected function setFileSize(int $expectedSize, $settingMinimum = false){
       $keyName = $settingMinimum !== false ? "MinFileSize" : "MaxFileSize";
       $this->addSetting($keyName, $expectedSize);
       return $this;
    }
    
    public function setMaximumFileSize(int $size){
        $this->setFileSize($size); 
        return $this;
    }

    protected function setMiniumFileSize(int $size){
        $this->setFileSize($size,true); 
        return $this;
    }
    
    protected function setFileNameSize(int $size,$settingMinimum = false){
        $keyName = $settingMinimum !== false ? "MinFileNameSize" : "MaxFileNameSize";
        
        $this->addSetting($keyName, $size);
        return $this;
     }
     
     protected function setFilenameMinimumLength(int $size){
        $this->setFileNameSize($size);
        return $this;
    }

    public function setFilenameMaximumLength(int $size){
        $this->setFileNameSize($size);
        return $this;
    }

    protected function setUploadSize(Bytes $size, $unitType = "mb"){
        $keyName = $settingMinimum !== false ? "MinUploadSize" : "MaxUploadSize";

        $byte = Bytes::getUnitTypeClass($unitType);//gets the unit type of file
        $expectedSize = $byte->setUnitSize($size)->unitSizeInBytes();
 
        $this->addSetting($keyName, $expectedSize);
        return $this;
    }

    protected function setUploadSizeMaximum(Bytes $size, $unitType = ""){
        $this->setUploadSize($size,$unitType); 
        return $this;
    }

    public function setUploadSizeMinimum(Bytes $size, $unitType = ""){
        $this->setUploadSize($size,$unitType); 
        return $this;
    }

    
    
    public function getMaximumFileSize(){
        return $this->getSettings()['MaxFileSize'];
    }

    public function getMinimumFileSize(){
        return $this->getSettings()['MinFileSize'];
    }
    
    public function getMaximumFileNameLength(){
        return $this->getSettings()['MaxFileNameSize'];
    }

    public function getMinimumFileNameLength(){
        return $this->getSettings()['MinFileNameSize'];
    }

    public function getSettings(){
      return $this->settings['settings'];
    }


    private function getUnitType($unitType = "mb"){
        return  $this->Bytes->getUnitTypeClass($unitType);
    }

    public function useSettings($type = ""){
        $cleanType = trim(strtolower($type));
        if($cleanType !== ""){
         if($cleanType == "image"){
             return new ImageSettings($this->Bytes );
         }
        }
    }


    
    
}
?>