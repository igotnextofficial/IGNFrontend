<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;

class Controller extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;


	public function getRelationshipId($relationships = []){
		$id = "";
		$keys = empty($relationships[0]) ?  null : array_keys($relationships[0]) ;
		if($keys !== null)
		{

			foreach($keys as $key){
				if ( strpos($key,"_id") ) {
					$id = $key;
					break;
				}
			}
		}
		return $id;
	}
	public function relationshipToInclude(Request $request){
		// return "data.relationships.{$column}";
		return $request->has("includes") ? explode(",",trim($request->query("includes"))) : [];
	}

	//edit to handle empty array gracefully.
	public function combineDataWithRelationShip(Request $request,$included_relationships = []){
		$data =  $request->input('data');
		if(!empty($included_relationships))
		{
			foreach($included_relationships as $included_relationship){
				if($request->has("data.relationships.{$included_relationship}")){
					$included_relationship_data = $request->input("data.relationships.{$included_relationship}.data"); // an array which contain ids
					$included_relationship_id = $this->getRelationshipId($included_relationship_data); // get id name of relationship.
					$user_relationship_ids = array_column($included_relationship_data ,$included_relationship_id );
					$data[$included_relationship] = $user_relationship_ids;
				}
			}

		}
		return $data;
	}
}
