<?php
  namespace App\Errors;
  interface Errors{
 /**
      * @return Boolean - return true if their is an error
      */
    public function hasError();
    public function add();

    public function display();

}

?>