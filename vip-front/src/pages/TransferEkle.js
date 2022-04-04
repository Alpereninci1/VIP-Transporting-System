import React, {Component, useState} from 'react';
import {Link} from 'react-router-dom'
import axios from 'axios';
import Select from 'react-select';

class TransferEkle extends Component{

    state={
        vehicle_id:'',
        passenger_id:'',
        date:'',
        time:'',
        start_point:'',
        end_point:'',
        yolcular:[],
        araclar:[],
        loading:true,
    }

    async componentDidMount(){

        const res= await axios.get('http://127.0.0.1:8000/api/araclar');
        if(res.data.status===200){
            this.setState({
                araclar:res.data.araclar,
                loading:false,
            });
        }
        const res_2=await  axios.get('http://127.0.0.1:8000/api/yolcular');
        if(res_2.data.status===200){
            this.setState({
                yolcular:res_2.data.yolcular,
                loading:false,
            })
        }

    }

    handleInput=(e) =>{
        this.setState({
            [e.target.name]:e.target.value
        });
    }



    saveTransfer= async(e)=>{
        e.preventDefault();

        const res = await axios.post('http://127.0.0.1:8000/api/Transfer_Ekle',this.state)
        if(res.data.status===200){

            console.log(res.data.message);
            this.setState({
                vehicle_id:'',
                passenger_id:'',
                date:'',
                time:'',
                start_point:'',
                end_point:'',
            });
        }
    }

    render(){
        let option = []
        let option_2=[]
        if (this.state.yolcular.length > 0) {
            this.state.yolcular.map(passenger => {
                let data = {}
                data.id = passenger.id
                data.ad = passenger.ad
                option.push(data)
            })
        }

        if(this.state.araclar.length>0){
            this.state.araclar.map(vehicle=>{
                let data={}
                data.id=vehicle.id
                data.plaka=vehicle.plaka
                option_2.push(data)
            })
        }
        return(
            <div className="container">
                <div className='row'>
                    <div className='col-md-6'>
                        <div className='card'>
                            <div className='card-header'>
                                <h4>
                                    Transfer Ekle
                                    <Link to={'/transferler'}
                                          className="btn btn-primary btn-sm float-end">Geri</Link>
                                </h4>
                            </div>

                            <div className='card-body'>
                                <form onSubmit={this.saveTransfer}>
                                    <div className="form-group mb-3">
                                        <label>Yolcu </label>
                                        <select id="locationPerson" class="form-control"  name="passenger_id" onChange={this.handleInput} >
                                            <option option value="" disabled selected>Select a passenger</option>
                                            {option.map((item) => (
                                                <option value={item.id}>{item.ad}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="form-group mb-3">
                                        <label>Araç </label>
                                        <select id="locationPerson" className="form-control" name="vehicle_id"
                                                onChange={this.handleInput}>
                                            <option option value="" disabled selected>Select a vehicle</option>
                                            {option_2.map((item) => (
                                                <option value={item.id}>{item.plaka}</option>
                                            ))}
                                        </select>
                                    </div>


                                    <div className="form-group mb-3">
                                        <label >Start Point</label>
                                        <input type="text" className="form-control"
                                               name="start_point"  onChange={this.handleInput}
                                               value={this.state.start_point}/>
                                    </div>

                                    <div className="form-group mb-3">
                                        <label >End Point</label>
                                        <input type="text" className="form-control"
                                               name="end_point" onChange={this.handleInput}
                                               value={this.state.end_point} />
                                    </div>
                                    <div className='form-group mb-3'>
                                        <label>Gün</label>
                                        <input type="date" name="date" onChange={this.handleInput}
                                               value={this.state.date} className='form-control'/>
                                    </div>
                                    <div className='form-group mb-3'>
                                        <label>Saat</label>
                                        <input type="time" name="time" onChange={this.handleInput}
                                               value={this.state.time} className='form-control'/>
                                    </div>

                                    <div>
                                        <button type="submit" className='btn btn-primary'>Kaydet</button>
                                    </div>

                                </form>
                            </div>
                        </div>

                    </div>

                </div>

            </div>
        );


    }

}

export default TransferEkle;