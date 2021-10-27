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

/* AUTH */

Route::post('login', 'Api\AuthController@login');
Route::post('register', 'Api\AuthController@register');

/* TAG */
Route::post('create_tag', 'Api\TagController@store');
Route::get('get_tag', 'Api\TagController@index');
Route::put('edit_tag', 'Api\TagController@update');
Route::delete('delete_tag', 'Api\TagController@destroy');

/* CATEGORY */
Route::get('img_upload', 'Api\CategoryController@upload');
Route::post('img_upload', 'Api\CategoryController@upload');
Route::delete('img_upload', 'Api\CategoryController@destroy_img');
Route::post('create_category', 'Api\CategoryController@store');
Route::get('get_category', 'Api\CategoryController@index');
Route::put('edit_category', 'Api\CategoryController@update');
Route::delete('delete_category', 'Api\CategoryController@destroy');



/* ADMIN USERS */

Route::post('create_user', 'Api\AdminUserController@store');
Route::get('get_user', 'Api\AdminUserController@index');
Route::put('edit_user', 'Api\AdminUserController@update');
Route::delete('delete_user', 'Api\AdminUserController@destroy');



Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});