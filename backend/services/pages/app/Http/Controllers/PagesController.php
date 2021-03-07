<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Pages;

class PagesController extends Controller
{

    public function test(){
        return json_encode(['test'=>'pages test']);
    }
    public function create(Request $request){
        $data = $request->all();
        $validated =  $this->validateData($request);
        $saved = $validated  ? Pages::create($data) : $validated ;
        return $saved;
    }

    public function retrieveData($Data = []){}

    public function validateData($request){
     $validated = $this->validate($request,[
          'title' => 'required|max:60|min:5|unique:pages',
          'slug' => 'required|max:120|min:5',
          'description' => 'required|max:400|min:5',
          'display' => 'required|boolean'
      ]);

      if (!$validated){
          return false;
      }
    }

    public function notEmpty($data){
        return $data !== null || $data !==  "";
    }



    public function validLength($min = 6, $max = 250, $data = ""){
        return ($data >= $min) && ($data <= $max);
    }

    public function validSlug(){

    }

    public function validateDisplay($data){
        return is_bool($data);
    }

    public function saveData($data = []){
        Pages::create($data);
    }
}

