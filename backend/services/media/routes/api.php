<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/
Route::get('/upload', 'ImageController@index');
Route::get("/testing",'ImageController@testing');
Route::post("/upload/{item}",'ImageController@upload');
// Route::get("/upload/album-cover",'ImageController@uploadAlbumCover');
// Route::get("/upload/track-cover",'ImageController@uploadTrackCover');
// Route::post('/upload', 'ImageController@upload');
Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

