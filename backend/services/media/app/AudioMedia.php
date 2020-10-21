<?php
namespace App;
use App\Concrete\MediaBase;
  class AudioMedia extends MediaBase{
    public function __construct(){
      parent::__construct();
      $this->setMaximumSize(3,'mb');
    }
  
    public function save($directory = "audio"){
      $filePath = $this->getMedia()->path();
      return $this->getStorage()->putFile($directory,new File($filePath));
    }
  }

?>
 