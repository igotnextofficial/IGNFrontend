<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Jbuapim\Crudster\Crudster;
use App\Models\Pages;

class PagesController extends Controller
{

    public function test(){
        $crud = new Crudster();
        return json_encode(['testddd'=>'pages test',"event" => $crud->event()]);
    }
    public function create(Request $request){
       
        $data = $request->input('data');
        return response()->json([$data],201);
        // $data['display'] = $data['display'] ? (int) $data['display'] : 0;
    
        // $validated =  $this->validateData($request);
        // $saved = $validated  ? Pages::create($data) : $validated ;
        // return  response()->json(["data" => $saved],201);
    }

    public function retrieveData($Data = []){}

    public function validateData($request){
     $validated = $this->validate($request,[
          'title' => 'required|max:60|min:5|unique:pages',
          'slug' => 'required|max:120|min:5',
          'description' => 'required|max:400|min:5',
          'display' => 'required|int'
      ]);

      if (!$validated){
          return false;
      }
      return true;
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

