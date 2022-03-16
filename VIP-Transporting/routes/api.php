<?php

use App\Http\Controllers\API\YolcuController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('yolcular',[YolcuController::class,'index']);
Route::post('Yolcu_Ekle',[YolcuController::class,'store']);

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
