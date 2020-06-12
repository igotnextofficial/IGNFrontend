<?php
  interface MediaInterface{
       function upload();
       function rename();
       function getSize();
       function retrieve();
       function delete();
       function validate();
       function save();
  }

?>