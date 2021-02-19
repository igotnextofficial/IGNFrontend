<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class PagesController extends Controller
{
    //

    public function create(Request $request){
        $adminInput = $request->all();
        return json_encode($adminInput);
        //get pages info(title,slug,content);
        //validate info
        //save information
    }
}
