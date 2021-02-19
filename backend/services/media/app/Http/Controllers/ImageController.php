<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use Illuminate\Support\Facades\Storage;
use App\Helpers\Bytes\BytesUnitInterface;
use App\Concrete\MediaInterface;
use App\Settings\settings;
use App\ImageMedia;

use App\Concrete\MediaStrategy;

use App\Validation\MediaValidation; 

use App\Errors\ApplicationError;
use App\Messages;

class ImageController extends Controller
{
    private $Byte;
    private $media;
    private $mediaSettings;
    private $mediaErrors;
    private $mediaValidation;
    private $directoryLocations  = [
        "avatar" => "images/avatar",
        "album" => "images/album-cover",
        "track" => "images/track-cover"
      ];
    
    function __construct(BytesUnitInterface $Byte,MediaInterface $Media, Settings $Settings){

        $this->Byte = $Byte;
        $this->media = $Media;
        $this->mediaSettings = $Settings;
        $this->mediaErrors = new ApplicationError();
        $this->mediaValidation = new MediaValidation($this->mediaErrors);
    }

    public function createStrategy($mechanisms = []){
        new MediaStrategy($mechanisms['media'],$mechanisms['settings'],$mechanisms['validations'],$mechanisms['errors']);
    }


    
    public function upload(Request $request,$item){
        // dd($this->mediaValidation);
        try {
          $mediaFile = $request->file("image");
          return  $this->saveImage($mediaFile,$item);
        } catch (\Throwable $th) {
          return json_encode(["error"=> $th->getMessage()]);
        }

    }

    private function getImage(Request $request, String $imageKey = "image"){
       return $request->file($imageKey);
    }
    
    private function saveImage($mediaFile = NULL,$item){
        $this->media->setMedia($mediaFile);
        
        $this->media->setDirectory($this->directoryLocations[$item]);
        $prepMedia = new MediaStrategy($this->media,$this->mediaSettings,$this->mediaValidation,$this->mediaErrors);
        $saveImage = $prepMedia->init();
        return  json_encode(["message" => $saveImage ]);
    }
    
    public function uploadAvatar(Request $request,$item){
        return $this->directoryLocations[$item];
        $this->media->setDirectory("images/avatar");
        return $this->media->getDirectory();   
    }

    public function uploadAlbumCover(Request $request){
        $this->media->setDirectory("images/albumcovers");
        return $this->media->getDirectory();
    }

    public function uploadTrackCover(Request $request){
        $this->media->setDirectory("images/trackcovers");
        return $this->media->getDirectory();
        
    }




}
