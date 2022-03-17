<?php

use App\Http\Controllers\API\YolcuController;
use App\Http\Controllers\API\AracController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('yolcular',[YolcuController::class,'index']);
Route::post('Yolcu_Ekle',[YolcuController::class,'store']);
Route::get('/Yolcu_duzenle/{id}',[YolcuController::class,'edit']);
Route::put('/Yolcu_Guncelle/{id}',[YolcuController::class,'update']);
Route::delete('yolcu_sil/{id}',[YolcuController::class,'destroy']);

Route::get('araclar',[AracController::class,'index']);
Route::post('Arac_Ekle',[AracController::class,'store']);
Route::get('/Arac_duzenle/{id}',[AracController::class,'edit']);
Route::put('/Arac_Guncelle/{id}',[AracController::class,'update']);
Route::delete('arac_sil/{id}',[AracController::class,'destroy']);

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
