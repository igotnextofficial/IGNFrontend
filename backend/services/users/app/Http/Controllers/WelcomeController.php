<?php

namespace App\Http\Controllers;
use App\Mail\welcome;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class WelcomeController extends Controller
{
    public function sendMail(){
        try{
          $sent = Mail::to('jbdesigns88@gmail.com')->send(new welcome());
       }
       catch(Exception $e){
           $e->getMessage();
       }
        // return json_encode(['sending' => $sent]);
    }
}
