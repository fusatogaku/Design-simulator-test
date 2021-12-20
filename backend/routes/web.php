<?php

use Illuminate\Support\Facades\Route;


// シミュレータの表示
Route::get('/', 'App\Http\Controllers\SimulateController@toDesign')
->name('design');

// item登録用 - 表示
Route::get('/items', 'App\Http\Controllers\SimulateController@showitems')
->name('items');
// item登録用 - 投稿
Route::get('/items/form', 'App\Http\Controllers\SimulateController@form')
->name('itemform');
// item登録用 - 保存
Route::post('/items/store', 'App\Http\Controllers\SimulateController@store')
->name('itemstore');

// テスト用
Route::get('/test', 'App\Http\Controllers\SimulateController@test')
->name('test');

