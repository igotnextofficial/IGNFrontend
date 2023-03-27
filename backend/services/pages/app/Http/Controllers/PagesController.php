<?php

namespace App\Http\Controllers;

use App\Http\Requests\createPageRequest;
use App\Http\Requests\updatePageRequest;
use Illuminate\Http\Request;
use App\Services\PageService;
use App\Models\Page;
use App\Http\Controllers\ContentController;
use Illuminate\Http\Response;


class PagesController extends Controller
{
    public function index(Request $request,PageService $page){
        return[ "data" => $page->getAll(false)];
    }

    public function test(){
        $model =new Page();
        $model::find(1)->first();
        $relationships = $model->isRelation('content') ;
        $relationship = 'content';
        return ["is_relation" => $relationships, 'model' => $model,"rels" => get_class($model->{$relationship}()), 'belongs' =>$model->{$relationship}() instanceof \Illuminate\Database\Eloquent\Relations\hasMany] ;
        $crud = new PageService();
        return ['testddd'=>'pages test',"event" => $crud->event()];
    }

    public function sluggify(String $data){
        return str_replace(" ", "-" ,strtolower($data));
    }
    
    public function create(createPageRequest $request){
       $page_service = new PageService();
        $data = $request->input('data');
       $slug = str_replace(" ", "-" ,strtolower($data['title']));
       $request->merge([ "data" => array_merge($data, ["slug" => $slug]) ]);
       $results = $page_service->create($request->input('data'));

       return response()->json($results,Response::HTTP_CREATED);
    }

    public function update(updatePageRequest $request, Page $page, PageService $page_service){
        $data = $request->input('data');
        if($data['title']){
            $slug = $this->sluggify($data['title']);
            $request->merge([ "data" => array_merge($data, ["slug" => $slug]) ]);
        }
        $results = $page_service->update($request->input('data'),$page);
        return $results ?  response()->json($results,Response::HTTP_OK) : response()->json($results,Response::HTTP_NOT_FOUND);
    }
    
    public function show(Request $request,$page_id,PageService $page_service){
        return $page_service->get($page_id);
    }

    public function delete(Request $request,Page $page, PageService $page_service){
        $page_service->remove($page);
    }


}

