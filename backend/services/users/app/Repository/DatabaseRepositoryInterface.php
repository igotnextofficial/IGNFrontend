<?php
namespace App\Repository;

interface DatabaseRepositoryInterface{
    /**
     * @param array $attributes
     * @return boolean
     */
    public function attach(array $attributes);
    /**
     * create a new dataset
     * @return boolean
     */
    
     public function create();

    /**
     * retrieves the data according to a searchable property
     * @param int|string $search
     * @return mixed
     */
    public function retrieveBy($search);
    
    /**
     * updates the data in the database
     *
     * @return boolean
    */

    public function update();
    
    /**
     * Saves the data to the database
     * @return boolean
     */
    public function save();
}
?>