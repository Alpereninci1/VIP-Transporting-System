<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Yolcu;
use App\Models\Transfer;
use App\Models\Arac;
use Illuminate\Http\Request;

class TransferController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $transferler=Transfer::with('vehicle','passenger')->get();

        return response()->json([
            'status'=>200,
            'transferler'=>$transferler,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        $araclar=Arac::all();
        $yolcular=Yolcu::all();

        $data=['araclar' => $araclar,
            'yolcular' => $yolcular];


        return response()->json([
            'status'=>200,
            'data'=>$data,
        ]);

    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $newData = new Transfer;

        $newData->passenger_id=$request->get('passenger_id');
        $newData->vehicle_id=$request->get('vehicle_id');
        $newData->start_point=$request->get('start_point');
        $newData->end_point=$request->get('end_point');
        $newData->date=$request->get('date');
        $newData->time=$request->get('time');

        $newData->save();
        return response()->json([
            'status'=>200,
            'message'=>'Transfer ekleme başarılı',
        ]);


    }

    public function edit($id){
        $transfers=Transfer::with('vehicle','passenger')->find($id);
        return response()->json([
            'status'=>200,
            'transfers'=>$transfers
        ]);
    }
    public function update(Request $request,$id){
        $transfers=Transfer::find($id);
        $transfers->passenger_id=$request->input('passenger_id');
        $transfers->vehicle_id=$request->input('vehicle_id');
        $transfers->start_point=$request->input('start_point');
        $transfers->end_point=$request->input('end_point');
        $transfers->date=$request->input('date');
        $transfers->time=$request->input('time');

        $transfers->save();

        return response()->json([
            'status'=>200,
            'message'=>'Transfer güncelleme başarılı',
        ]);
    }

    public function destroy($id){
        $transfer= Transfer::find($id);
        $transfer->delete();
        return response()->json([
            'status'=>200,
            'message'=>'Transfer silme başarılı',
        ]);
    }
}
