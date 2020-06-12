<?php
 namespace App\Repository\Eloquent;
 use \App\Repository\UserRepositoryInterface;
 use \App\Repository\BaseRepositoryInterface;
 use Illuminate\Http\Request;
 use Illuminate\Support\Facades\Hash;
 use \App\User;
 use \App\Artist;
 use \App\Staff;

 class UserRepository extends BaseRepository implements  UserRepositoryInterface{
  private $user;
  protected $attributes;

  public function __construct(Request $request, User $user){
    parent::__construct($user);
    $this->user = $this->getModel();
  }

  public function break_down_path_retrieve_model($path = ""){
    $uri = $this->break_down_path($path);
    try{
    return $this->retrieve_user_model($uri);
    }
    catch(Exception $e){
      return $e->getMessage();
    }
  }
  
  public function break_down_path($path =""){
    $startPosition = strripos($path,"/");
    $endPosition = strlen($path) - 1;
    $retrievePathEnd = substr($path,$startPosition, $endPosition );
    $pathWithoutBackslash = str_replace("/","",$retrievePathEnd);
    return trim(strtolower($pathWithoutBackslash));
 
  }

  public function  encryptPassword(){
    return $this->hashPassword();
  }
  
  private function hashPassword(){
    $password =  $this->attributes['password'];
    return trim($password) != "" ?  $this->setPassword(Hash::make(trim($password)))  : "";
  }

  private function setPassword($hashedPassword){
    $this->attributes["password"] = $hashedPassword;
  }
  
  public function getProperty(){
       $user = $this->user->where('id',1)->get();
       return ["name" => $user];
   }

 }

?> 