<?php 
namespace App\Repository\Eloquent;
use App\Repository\DatabaseRepositoryInterface;

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Eloquent\Model;

class BaseRepository implements DatabaseRepositoryInterface{
    protected $model;
    
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

    protected function set_property($key,$value){
      $this->model->key = htmlspecialchars(trim($value));
    }

    public function create()
    {
      return false;
    }

    public function retrieveBy($property = "")
    {
      return $property;
    }

    public function update()
    {
      return false;
    }

    public function save()
    {
      return false;
    }

    public function column_exists($column = "")
    {
      return Schema::hasColumn($this->get_model_name_as_string(), $column) ? true : false;
    }
}

?>