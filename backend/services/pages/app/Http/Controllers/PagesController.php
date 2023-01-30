<?php

namespace App\Http\Controllers;

use App\Http\Requests\createPageRequest;
use App\Http\Requests\updatePageRequest;
use Illuminate\Http\Request;
use App\Services\PageService;
use App\Models\Page;
use Illuminate\Support\Arr;

class PagesController extends Controller
{

    public function test(){
        $model =new Page();

        $relationships = $model->isRelation('content') ;
        $relationship = 'content';
        return ["lets" => $relationships, 'model' => $model,"rels" => get_class($model->{$relationship}()), 'belongs' => $model->{$relationship}() instanceof \Illuminate\Database\Eloquent\Relations\BelongsToMany] ;
        $crud = new PageService();
        return ['testddd'=>'pages test',"event" => $crud->event()];
    }

    public function create(createPageRequest $request){
       $page_service = new PageService();
       $results = $page_service->attachData($request->input('data'))->create();
       return $results;
    }
    public function update(updatePageRequest $request,Page $page){}
    public function index(Request $request){}
    public function show(Request $request,Page $page){
        $page_service = new PageService();
        
    }
    public function delete(Request $request,Page $page){}


}

