<?php

use App\Http\Controllers\API\YolcuController;
use App\Http\Controllers\API\AracController;
use App\Http\Controllers\API\TransferController;
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

Route::get('transferler',[TransferController::class,'index']);
Route::post('Transfer_Ekle',[TransferController::class,'store']);
Route::get('Transfer_Ekle',[TransferController::class,'create']);
Route::get('/Transfer_duzenle/{id}',[TransferController::class,'edit']);
Route::put('/Transfer_Guncelle/{id}',[TransferController::class,'update']);
Route::delete('transfer_sil/{id}',[TransferController::class,'destroy']);

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});
