<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use Illuminate\Support\Facades\Storage;
use App\Helpers\Bytes\BytesUnitInterface;
use App\Concrete\MediaInterface;
use App\Settings\settings;
use App\VideoMedia;

use App\Concrete\MediaStrategy;

use App\Validation\MediaValidation; 

use App\Errors\ApplicationError;
use App\Messages;

class VideoController extends Controller
{
    private $Byte;
    private $media;
    private $mediaSettings;
    private $mediaErrors;
    private $mediaValidation;
    
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

    public function index(){
        return view('uploadfile');
    }
    
    public function upload(Request $request){
        // dd($this->mediaValidation);
        try {
          $mediaFile = $request->file('image');
          $this->media->setMedia($mediaFile);
      
          $prepMedia = new MediaStrategy($this->media,$this->mediaSettings,$this->mediaValidation,$this->mediaErrors);
        
             return  json_encode(["message" => $prepMedia->init()]);
              
        } catch (\Throwable $th) {
            // dd($th->getTraceAsString());
            dd($th->getTrace());
          return json_encode(["error"=> $th->getTrace()]);
        }

    }

    public function testing(){return false;}

}
