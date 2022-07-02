<?php 
 namespace App\Services;
 use App\Services\interfaces\ServiceInterface;



 class BaseService implements ServiceInterface{
     public function create($data = []){
         return is_bool(false);
     }

     public function update(array $data){
         return false;
     }

     public function delete(int $id){
         return false;
     }

     public function retrive(string $column_name, mixed $identifier){
         return [];
     }
 }


?>