<?php 
namespace App\Repository\Eloquent;
use App\Repository\DatabaseRepositoryInterface;

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Eloquent\Model;

class BaseRepository implements DatabaseRepositoryInterface{
    protected $model;
    protected $attributes;
    
    public function __construct(Model $model)
    {
      $this->model = $model;
    }

    protected function getModel($add_plural = false){
      return $this->model;
    }

    protected function get_model_name($add_plural = false)
    {
      $classname = strtolower(str_replace(["\\","App"],"",get_class($this->model)));
      $plural = !$add_plural ? "" : "s" ;
      return $classname . $plural;
    }

    public function attach($attributes = array())
    {
      foreach( $attributes as $column => $value ){
        if ( $this->column_exists($column) ){
          $this->setProperty($column,$value); 
        }    
      }
      
    }

    protected function setProperty($key,$value){
      $this->attributes[$key]= htmlspecialchars(trim($value));
    }
    
    public function retrieveBy($property = "", $value = "")
    {
      if(!column_exists($property)){return false;}
      return $this->getModel()->where($property , $value);
    }

    public function update()
    {
      return false;
    }

    public function save()
    {
      $model = $this->getModel();
      $email = $this->attributes['email'];
      try {
        $model::updateOrCreate($this->attributes);
        return true;
      } catch (\Throwable $th) {
         echo json_encode(["error" => "cannot save user [$email] already exists." ]);
         return false;
      }
      
    }

    public function column_exists($column = "")
    {

      
      return Schema::hasColumn($this->get_model_name(true), $column) ? true : false;
    }
}

?>