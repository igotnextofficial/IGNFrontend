<?php
namespace App;
use App\MediaGeneral;
use Illuminate\Http\File;
use Illuminate\Support\Facades\Storage;

class ImageMedia extends MediaGeneral{
  // private $storage;
  // private $media;
  public function __construct(){
    parent::__construct();
    $this->setMaximumSize(3,'mb');
  }

  public function save($directory = "images/avatar"){
    $filePath = $this->getMedia()->path();
    return $this->getStorage()->putFile($directory,new File($filePath));
  }

  public function update(){return false;}
  
  public function getName(){
      return "Image";
    }
  }

?>
