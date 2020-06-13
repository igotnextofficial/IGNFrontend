<?php
  interface MediaInterface{
       public function upload();
       public function rename();
       public function getSize();
       public function retrieve();
       public function delete();
       public function validate();
       public function save();
  }

?>