<?php 
namespace App\Http\Controllers;
  use Illuminate\Support\Str;
  use Illuminate\Support\Facades\Hash;
  use Illuminate\Http\Request;
  use App\Auth;
  use \App\Repository\UserRepositoryInterface;


  class UserController extends Controller
  {
    private $username;
    private $password;
    private $credentials = [];
    private $data = [];
    private $user; 
    
    public function __construct(UserRepositoryInterface $user){

       $this->user = $user;
       $this->set_user();
    }

    public function __invoke(){}

    public function set_user(){
      $u = $this->user;
      echo json_encode($u->getProperty());
    }

    protected function get_user(){
      return $this->user();
    }
    public function test($userType){
      $user = new User();
      $this->set_user($user);
      return json_encode([ 'test' => $userType]);
    }


    private function is_loggedIn(){
      return Auth::check() ? true : false;
    }
    
    private function set_credentials($credentials_sent_from_user = []){
      $this->credentials['user'] = $this->use_username_or_email($credentials_sent_from_user);
      $this->credentials['password'] = $credentials_sent_from_user['password'];
      $this->set_check_if_active();
    }
    
    private function use_username_or_email($credentials_sent_from_user){
      return $credentials_sent_from_user['username'] || $credentials_sent_from_user['email'] || "";
    }
    
    private  function set_check_if_active(){
      $this->credentials['active'] = 1;
    }
    
    private function valid_credentials(){ 
      Auth::attempt($this->credentials);
    }
    
    private function error_logging_in($msg = "username or password does not match"){
      return ["error" => $msg];
    }
    
    private function get_loggedIn_user(){
      return Auth::user();
    }
    
    public function login(Request $request){
      if(!$this->is_loggedIn()){
        $this->set_credentials($request->input());
        return !$this->valid_credentials() ? $this->error_logging_in() : $this->get_loggedIn_user();
      }
    }
    
    private function logout(){
      return !$this->is_loggedIn() ? "" : Auth::Logout(); 
    }
    
   public function sign_up(Request $request){
    #if user does not exist do the following. 
    #get user data
    $this->get_user_user_data($request->input());
    #hash password
    $this->hash_password();
    #save user data 
    $this->save(); 
     
   }

  private function save(){
    return User::create($this->data);
  }

  private function user_exists(){
      
  }

   private function get_user_user_data($userData = []){
     foreach($userData as $key => $value){
       if(Schema::hasColumn('users',$key)){
         $this->data[$key] = $this->clean_user_data($value);
       }
     }
   }

   private function clean_user_data($value = ""){
     return htmlspecialchars(trim($value));
   }

   private function valid_string_length($string,$max = 30, $min = 1){
     return ($string >= $min) && ($string <= $max);
   }

   private function hash_password(){
   isset($this->data['password']) ?  $this->data['password'] = Hash::make($this->data['password']) : "";
     return isset($this->data['password']);
   }
   
  }
  

?>