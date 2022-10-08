<?php 
 namespace App\Services;
 use App\Services\interfaces\ServiceInterface;



 class BaseService implements ServiceInterface{
    public function create($with_relationship = false){
        return BaseService::class;
    }
 }


?>