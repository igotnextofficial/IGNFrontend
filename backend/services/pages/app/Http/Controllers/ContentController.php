<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\createContentRequest;
use App\Services\ContentService;
use App\Models\Content;
use Illuminate\Support\Arr;
class ContentController extends Controller
{
    

    public function create(createContentRequest $request){
        $content_service = new ContentService();
        $data = Arr::except($request->input('data',[]),'relationships') ;
        $relationships = $request->input('data.relationships',[]);

        $results = $content_service->create($data,$relationships);
        return $results;
    }

    public function addContentToPage(Request $request, int $page_id ){

    }
}
