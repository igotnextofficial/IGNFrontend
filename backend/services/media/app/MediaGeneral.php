<?php
namespace App;

use App\Concrete\MediaBase;


class MediaGeneral extends MediaBase{
    public function __construct(){
     parent::__construct();   
    }
    
    public function save(){
        $directory = $this->getDirectory();
        $filePath = $this->getMedia()->path();
        return $this->getStorage()->putFile($directory,new File($filePath));
      }

    public function update(){
        return false;
    }
}

?>