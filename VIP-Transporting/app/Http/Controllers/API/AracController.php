<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Arac;


class AracController extends Controller
{
    public function index(){
        $araclar=Arac::all();
        return response()->json([
            'status'=>200,
            'araclar'=>$araclar,
        ]);
    }
    public function store(Request $request){
        $arac=new Arac;
        $arac->marka=$request->input('marka','not informed');
        $arac->plaka=$request->input('plaka','not informed');
        $arac->surucu=$request->input('surucu','not informed');


        $arac->save();

        return response()->json([
            'status'=>200,
            'message'=>'Arac ekleme başarılı',
        ]);
    }

    public function edit($id){
        $arac=Arac::find($id);
        return response()->json([
            'status'=>200,
            'arac'=>$arac
        ]);
    }
    public function update(Request $request,$id){
        $arac=Arac::find($id);
        $arac->marka=$request->input('marka');
        $arac->plaka=$request->input('plaka');
        $arac->surucu=$request->input('surucu');


        $arac->save();

        return response()->json([
            'status'=>200,
            'message'=>'Arac güncelleme başarılı',
        ]);
    }

    public function destroy($id){
        $arac= Arac::find($id);
        $arac->delete();
        return response()->json([
            'status'=>200,
            'message'=>'Arac silme başarılı',
        ]);
    }
}
