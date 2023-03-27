<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PagesController;
use App\Http\Controllers\ContentController;

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
Route::get('/', [PagesController::class,'test'])->name('getAllPages');
Route::get('/pages', [PagesController::class, 'index'])->name('getAllPages');
Route::post('/pages',[PagesController::class,'create'])->name('createPage');
Route::get('/pages/{page_id}', [PagesController::class, 'show'])->name('getSpecificPage');
Route::patch('/pages/{page}',[PagesController::class,'update'])->name('updateSpecifiedPage');
Route::delete('/pages/{page}',[PagesController::class,'delete'])->name('deleteSpecifiedPage');

Route::post('/content',[ContentController::class,'create'])->name('createContent');
Route::get('/{content}', [ContentController::class, 'show'])->name('getSpecificContent');
Route::patch('/{content}',[ContentController::class,'update'])->name('updateSpecifiedContent');
Route::delete('/{content}',[ContentController::class,'delete'])->name('deleteSpecifiedContent');
Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});
