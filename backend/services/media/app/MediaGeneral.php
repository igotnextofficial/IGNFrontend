<?php
namespace App;

use App\Concrete\MediaBase;


class MediaGeneral extends MediaBase{
    public function __construct(){
     parent::__construct();   
    }
    public function save($directory = ""){
        return false;
    }

    public function update(){
        return false;
    }
}

?>