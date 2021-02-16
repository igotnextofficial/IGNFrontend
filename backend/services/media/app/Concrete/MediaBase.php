<?php 
namespace App\Concrete;
use Illuminate\Support\Facades\Storage;
use App\Concrete\MediaInterface;
use App\Helpers\Bytes\Bytes;
use App\Validation\Validator;
use App\Errors\Errors;
use App\Models\Media;

class MediaBase implements   MediaInterface {
    private $name;
    private $size;
    private $maximumSize; //in bytes
    private $type;
    private $media;
    private $storage;
    protected $directory;

    public function __construct($useDefaults = false){
        $this->storage = Storage::disk('s3');
        $useDefaults ? $this->defaultSettings() : "";
    }
    
    protected function getStorage(){
      return $this->storage;
    }

    protected function defaultSettings(){
      $this->setMaximumSize();
    }
    
    // public function process($mediaObject){
    //     $this->setMedia($mediaObject)->validate()->save();
    //     json_encode(["message" => "image was saved."]);
    // }

    // setters

    public function setMedia($media = null){
      if ($media !== null){
        $this->setName($media->hashName());
        $this->setType($media->extension());
        $this->setSize(filesize($media->path()));
        $this->media = $media;
      }
       return $this;
    }
    
    protected function setSize($size){
      $this->size = $size;
    }
    
    protected function setMaximumSize(int $size = 3, $unitType = "mb"){
         $byte = Bytes::getUnitTypeClass($unitType);
         echo json_encode(["unit" => $unitType]);
         $this->maximumSize = $byte->setUnitSize($size)->unitSizeInBytes();
    }

    protected function setName(String $name){
      if(trim($name) !== ""){
        $positionOfDot = strrpos($name,".");
        $newName = substr($name,0,$positionOfDot);
        $this->name = $newName;
      }
    }

    protected function setType(String $type){
        $this->type = $type;
    } 
    
    public function setDirectory(String $directory =""){
      $this->directory = htmlspecialchars(trim($directory));
    }
    //getters

    public function getMedia(){
      return $this->media;
    }
    
    public function getType(){
      return $this->type;
    }
    
    public function getSize(){
      return $this->size;
    }

    public function getDirectory(String $directory =""){
       return $this->directory;
    }

    public function validSize(){  // done only in validation class
      $sizeIsValid = $this->getSize() < $this->maximumSize ? true : false;
      return json_encode(["size" => $this->getSize() . " < " . $this->maximumSize . ": " . $sizeIsValid]);
    }
    
    public function retrieve(){}

    public function rename(){}

    public function validate(){}
    
    public function upload(){}

    public function delete(){}
    
    public function save(){
      return "mediabase";
    }
    
    public function saveToDatabase(){
      $media = new Media;
      $media->name = $this->name;
      $media->type = $this->type;
      $media->location = $this->directory;
      $media->size = $this->size;
      $media->user_id = 0;
      $media->save();
    }
    public function update(){}
}

?>