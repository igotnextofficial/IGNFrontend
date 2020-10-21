<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use App\ImageMedia;

use App\Helpers\Bytes\BytesUnitInterface;
use App\Settings\BaseSettings;
use App\Concrete\MediaStrategy;
use App\Concrete\MediaInterface;
use App\Settings\settings;

use App\Validation\MediaValidation; 

use App\Errors\ApplicationError;



class MediaController extends Controller
{
    protected  $Byte;
    protected $mediaValidation;
    protected $mediaSettings;
    protected $mediaErrors;
    protected $media;

    function __construct(BytesUnitInterface $Byte,MediaInterface $Media){
      echo json_encode(["media" => "upload"]);
      $this->Byte = $Byte;
      $this->media = $Media;
      // $this->mediaSettings = $Settings;
      $this->mediaErrors = new ApplicationError();
      $this->mediaValidation = new MediaValidation($this->mediaErrors);

      
    }
    

    public function createStrategy($mechanisms = []){
        new MediaStrategy($mechanisms['media'],$mechanisms['settings'],$mechanisms['validations'],$mechanisms['errors']);
    }
    public function index(){
        return view('uploadfile');
    }

    public function upload(Request $request){
        try {
          $mediaFile = $request->file('image');
          $this->media->setMedia($mediaFile);
        //   dd($this->mediaValidation);
          $prepMedia = new MediaStrategy($this->media,$this->mediaSettings,$this->mediaValidation,$this->mediaErrors);
             return $prepMedia->init();
            // return $Media->process($mediaFile);
            //code...
        } catch (\Throwable $th) {
            
          return json_encode(["error"=>$th->getMessage()]);
        }
    //    $valid = [ "b","kb"];
    //    return json_encode(["" => array_search("kb",$valid)]);
    //     $imageSize = $request->file('image')->getSize();
    //     $maxSize = $this->getKiloBytes(200);
    //     $validimageSize = $imageSize < $maxSize;
    //     $saveImage = $request->file('image')->store('avatars');// this is save
        // return MediaBase::test();
    }

    public function testing(){
       $value = [];
       $settings = $this->mediaSettings;
       $validateMedia = $this->mediaValidation ;
       $size  = 3;
       array_push($value,["errors" => $validateMedia->validate()]);

   
  
       $settings->setMaximumFileSize($size)->setFilenameMaximumLength(20);
     
      
    
       return json_encode($value);
    }
}
