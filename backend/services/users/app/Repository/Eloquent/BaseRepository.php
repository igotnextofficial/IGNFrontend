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

    protected function getModel(){
      return $this->model;
    }

    protected function get_model_name()
    {
      return strtolower(str_replace(["\\","App"],"",get_class($this->model)));
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

    public function create(array $attributes)
    {

      $saved = $this->getModel()::create($attributes); 
    
      return $saved ? true : false;
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
      $model::updateOrCreate($this->attributes);
      return false;
    }

    public function column_exists($column = "")
    {
      return Schema::hasColumn($this->get_model_name_as_string(), $column) ? true : false;
    }
}

?>