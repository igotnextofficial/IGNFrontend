<?php
namespace App\Settings;
use App\Settings\BaseSettings;
use App\Helpers\Bytes\BytesUnitInterface;

class ImageSettings extends BaseSettings{
    protected $Bytes;
   
    function __construct(BytesUnitInterface $Bytes){
        parent::__construct($Bytes);
        $this->init();
    }
    
    private function init(){
        $this
        ->setValidTypes("png")
        ->setValidTypes("jpg")
        ->setValidTypes("jpeg")
         ->setMaximumValidFileSize()
        ->setMiniumValidFileSize()
        ->setMaxiumValidFileNameSize()
        ->setMiniumValidFileNameSize();

    }

    public function setMaximumValidFileSize(){
        $ByteUnit = $this->getUnitType(); // default is megaBytes
        $MaximumSize = $ByteUnit->setUnitSize(3)->unitSizeInBytes();
        $this->setFileSize($MaximumSize); // Using Method from parent BaseSettings.
        return $this;
    }
    
    public function setMiniumValidFileSize(){
        $ByteUnit = $this->getUnitType('kb');
        $minimumSize = $ByteUnit->setUnitSize(3)->unitSizeInBytes();
        $this->setFileSize($minimumSize,true); // Using Method from parent BaseSettings.
        return $this;
    }

    public function setMaxiumValidFileNameSize(){
        $this->setFileNameSize(35);
        return $this;
    }

    public function setMiniumValidFileNameSize(){
        $this->setFileNameSize(3,true);
        return $this;
    }
    
    
    private function getUnitType($unitType = "mb"){
        return  $this->Bytes->getUnitTypeClass($unitType);
    }

}

?>