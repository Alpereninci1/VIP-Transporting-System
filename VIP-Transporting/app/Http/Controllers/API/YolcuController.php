<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Yolcu;

class YolcuController extends Controller
{
    public function index(){
        $yolcular=Yolcu::all();
        return response()->json([
            'status'=>200,
            'yolcular'=>$yolcular,
        ]);
    }
    public function store(Request $request){
        $yolcu=new Yolcu;
        $yolcu->ad=$request->input('ad','not informed');
        $yolcu->soyad=$request->input('soyad','not informed');
        $yolcu->numara=$request->input('numara','not informed');
        $yolcu->tip=$request->input('tip','not informed');

        $yolcu->save();

        return response()->json([
            'status'=>200,
            'message'=>'Yolcu ekleme başarılı',
        ]);
    }

    public function edit($id){
        $yolcu=Yolcu::find($id);
        return response()->json([
            'status'=>200,
            'yolcu'=>$yolcu
        ]);
    }
    public function update(Request $request,$id){
        $yolcu=Yolcu::find($id);
        $yolcu->ad=$request->input('ad');
        $yolcu->soyad=$request->input('soyad');
        $yolcu->numara=$request->input('numara');
        $yolcu->tip=$request->input('tip');

        $yolcu->save();

        return response()->json([
            'status'=>200,
            'message'=>'Yolcu güncelleme başarılı',
        ]);
    }

    public function destroy($id){
        $yolcu= Yolcu::find($id);
        $yolcu->delete();
        return response()->json([
            'status'=>200,
            'message'=>'Yolcu silme başarılı',
        ]);
    }
}
