<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class MediaController extends Controller
{

    public function index(){
        return view('uploadfile');
    }
    public function upload(Request $request){
       $valid = [ "b","kb"];
       return json_encode(["" => array_search("kb",$valid)]);
        $imageSize = $request->file('image')->getSize();
        $maxSize = $this->getKiloBytes(200);
        $validimageSize = $imageSize < $maxSize;
        $saveImage = $request->file('image')->store('avatars');// this is save
        return json_encode(["help" => pow(1024,2)]);
    }

    public function getKiloBytes(int $num){
      return 1024 * $num;
    }
}
