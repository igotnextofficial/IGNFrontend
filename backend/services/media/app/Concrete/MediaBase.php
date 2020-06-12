<?php 
namespace App\Concrete;
use Illuminate\Support\Facades\Storage;

Abstract class MediaBase implements MediaInterface {
    private $name;
    private $size;
    private $maximumSize; //in bytes
    private $type;
    private $media;
    private $storage;

    public function __construct(){
        $this->storage = new Storage();
    }

    protected function defaultSettings(){

    }
    
    public function process($mediaObject){
        $this->setMedia($mediaObject)->validate()->save();
    }
    protected function upload(){} 
    

    public function getSize(){
        return storage::size($this->media);
    }

    protected function setSize(){
        $this->size = $this->media->getSize();
    }

    protected function validSize(){ 
      return $this->size < $this->maximumSize;
    }


    protected function setMaximumSize(int $size){
         $this->maximumSize = $this->convertToBytes($size);
    }

    protected function convertToBytes(int $size, $measurement = "kb"){
        $validMeasurements = ["b","kb","mb","gb"]; 
        if(!in_array(strtolower(trim($measurement)),$validMeasurements)){
            //add error
            return false;
            
        }

        $position = array_search($measurement);
        $bytes = pow(1024,$postiton);
        return $bytes * $size;
    }


    protected function rename(){} // this is automatically done with laravel

    protected function setName(String $name){
      if(trim($name) !== ""){
        $this->name = $name;
      }
    }
    protected function setType(String $type){
        $this->type = $type;
    } // I don't currently see a need to explicitly set the type of a file. 
    

    protected function retrieve($args = []){
      $this->media->where($args)->get();
    }

    protected function validate(){
        //check if name is valid
        $this->validType()  ?  "" : $this->addError("type"," The fileis not a valid type"); //check if type is valid
        $this->validSize()  ?  "" : $this->addError("size"," The file size is too large."); //check if size is valid
        return $this;
        
    }

    protected function save(){
        $this->storage->store($this->media);
        return $this;
    }
    public abstract function getName();
}

?>