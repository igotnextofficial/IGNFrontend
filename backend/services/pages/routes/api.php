<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PagesController;

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
Route::get('/', [PagesController::class,'index'])->name('getAllPages');
Route::post('/',[PagesController::class,'create'])->name('createPage');

Route::get('/{page}', [PagesController::class, 'show'])->name('getSpecificPage');
Route::patch('/{page}',[PagesController::class,'update'])->name('updateSpecifiedPage');
Route::delete('/{page}',[PagesController::class,'delete'])->name('deleteSpecifiedPage');


Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});
