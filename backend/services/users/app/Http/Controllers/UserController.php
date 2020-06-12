<?php 
namespace App\Http\Controllers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use \App\Repository\UserRepositoryInterface;
use App\Validate\UserValidate;


  class UserController extends Controller
  {
    private $username;
    private $password;
    private $credentials = [];
    private $data = [];
    private $user; 
    
    public function __construct(UserRepositoryInterface $user){
       $this->setUser($user);
    }

    public function __invoke(){}

    private function setUser($user = null){
      if($user !== null){
        $this->user = $user;
      }
    }

    public function getUser(){
      return $this->user();
    }
    
    //Login user

    public function login(Request $request){
      if(!$this->isLoggedIn()){
        $this->setCredentials($request);
        return !$this->validateCredentials() ? $this->errorLoggingIn() : $this->retrieveLoggedInUser();
      }
      else{
        echo json_encode(["error" => "user is already loggedin"]);
      }
    }

    private function isLoggedIn(){
      return Auth::check() ? true : false;
    }
    
    private function setCredentials($credentials_sent_from_user = [] ){
      $info = $this->useUsernameOrEmail( $credentials_sent_from_user );
      $this->credentials = $credentials_sent_from_user->only($info, 'password');
      $this->credentials['password'] = $credentials_sent_from_user['password'];
      $this->setCheckIsActive();
    }
    
    private function useUsernameOrEmail($credentials_sent_from_user){
      return isset($credentials_sent_from_user['username']) ? "username" : "email"; 
    }
    
    private  function setCheckIsActive(){
      $this->credentials['active'] =  1;
    }
    
    private function validateCredentials(){ 
      try {
       return Auth::attempt($this->credentials);
      } catch (\Throwable $th) {
        echo json_encode(["error" => "cannot find user"]);
      }
    
    }
    
    private function errorLoggingIn($msg = "username or password does not match"){
      return ["error" => $msg];
    }
    
    private function retrieveLoggedInUser(){
      return json_encode(["userInformation" => Auth::user()]);
    }
    
    private function logout(){
      return !$this->isLoggedIn() ? "" : Auth::Logout(); 
    }
    //End Login

    public function signup(Request $request){
      $validation = new UserValidate($request->input());
      $valid = $validation->validate();
      if(!$valid){return json_encode(["valid" => $validation->getErrors()]);}
     
      $this->user->attach($request->input());
      $this->user->encryptPassword(); 
      $this->user->save(); 
   
    }
    
    private function cleanUserData($value = ""){
     return htmlspecialchars(trim($value));
    }

   private function validStringLength($string,$max = 30, $min = 1){
     return ($string >= $min) && ($string <= $max);
   }


   
  }
  

?>