<?php
namespace App;

class Messages {
    private static $Messages = ["validTypes" => 
             [
              "image" => "The File type is invalid must be a jpg file.",
              "audio" => "",
              "video" => "",
            ], 
            "minimumFileSize" => "The file size is to small",
            "maximumFileSize" => "The file size is too large"

           ];



     public static function Display($item = "",$item2 = "",$checkForItem2 = false){
        return !($checkForItem2) ?self::$Messages[$item] : self::$Messages[$item][$item2];
     }

     public static function cleanAndTrim($item =""){
       return trim(htmlspecialchars($item));
     }

     public static function stringExist($item = ""){
       return trim($item) !== "";
     }

     public static function itemExistInArray($item = "",$item2 = "",$checkForItem2 = false){
       return !($checkForItem2) ? isset(self::$Messages[$item]) : isset(self::$Messages[$item][$item2]) ;
     } 

     private static function prep($item = "",$item2 = "",$checkForItem2 = false){

         $getItem1 = self::cleanAndTrim($item1);
         $getItem2 = self::cleanAndTrim($item2);
         if(self::itemExistInArray($getItem1,$getItem2,$checkForItem2)){

         }
     }

    }
         
?>