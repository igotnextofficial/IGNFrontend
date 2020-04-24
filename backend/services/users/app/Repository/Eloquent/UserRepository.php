<?php
 namespace App\Repository\Eloquent;
 use \App\Repository\UserRepositoryInterface;
 use \App\Repository\BaseRepositoryInterface;
 use Illuminate\Http\Request;
 use \App\User;
 use \App\Artist;
 use \App\Staff;

 class UserRepository extends BaseRepository implements  UserRepositoryInterface{
  private $user;
  public function __construct(Request $request, User $user){
    parent::__construct($this->break_down_path_retrieve_model($request->path()));
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

  public function retrieve_user_model($type){
    $userType = null;

    switch ($type) {
      case 'artist':
        $userType = new Artist();
        break;
      
      case 'staff':
        $userType = new Artist();
        break;

      case 'user':
        $userType = new User();
        break;
      
      default:
        throw new Exception("Invalid type. [$type] is not a valid user type", 1);
        
        break;
    }
    return $userType;
  }



   public function getProperty(){
       $user = $this->user->where('id',1)->get();
       return ["name" => $user];
   }

 }

?> 