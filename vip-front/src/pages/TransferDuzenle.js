import React, {Component} from 'react';
import {Link} from 'react-router-dom'
import axios from 'axios';
class  TransferDuzenle extends Component{

    state={
        vehicle_id:'',
        passenger_id:'',
        date:'',
        time:'',
        start_point:'',
        end_point:'',
        yolcular:[],
        araclar:[],
        transferler: [],
    }
    handleInput=(e) =>{
        this.setState({
            [e.target.name]:e.target.value
        });
    }



    async componentDidMount(){

        const transfer_id=this.props.match.params.id;
        console.log(transfer_id);
        const res= await axios.get(`http://127.0.0.1:8000/api/Transfer_duzenle/${transfer_id}`);
        if(res.data.status===200){
            this.setState({
                vehicle_id: res.data.transfers.vehicle_id,
                passenger_id:res.data.transfers.passenger_id,
                date:res.data.transfers.date,
                time:res.data.transfers.time,
                start_point:res.data.transfers.start_point,
                end_point:res.data.transfers.end_point,
            });
        }

        const res_2= await axios.get('http://127.0.0.1:8000/api/araclar');
        if(res_2.data.status===200){
            this.setState({
                araclar:res_2.data.araclar,
                loading:false,
            });
        }
        const res_3=await  axios.get('http://127.0.0.1:8000/api/yolcular');
        if(res_3.data.status===200){
            this.setState({
                yolcular:res_3.data.yolcular,
                loading:false,
            })
        }

    }
    saveTransfer= async(e)=>{
        e.preventDefault();
        document.getElementById('updatebtn').disabled=true;
        document.getElementById('updatebtn').innerText="Güncelleniyor";
        const transfer_id=this.props.match.params.id;
        console.log(transfer_id);
        const res = await axios.put(`http://127.0.0.1:8000/api/Transfer_Guncelle/${transfer_id}`,this.state)
        if(res.data.status===200){
            console.log(res.data.message);
            document.getElementById('updatebtn').disabled=false;
            document.getElementById('updatebtn').innerText="Güncellendi";
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
                                    Transfer Düzenle
                                    <Link to={'/transferler'}className="btn btn-primary btn-sm float-end">Geri</Link>
                                </h4>
                            </div>

                            <div className='card-body'>
                                <form onSubmit={this.saveTransfer}>
                                    <div className="form-group mb-3">
                                        <label>Yolcu </label>
                                        <select id="locationPerson" className="form-control" name="passenger_id"
                                                onChange={this.handleInput}>
                                            {this.state.transferler.map((item,index) => (
                                                <option key={index} disabled selected>{item.passenger.ad}</option>
                                            ))}
                                            {option.map((item) => (
                                                <option value={item.id}>{item.ad}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="form-group mb-3">
                                        <label>Araç </label>
                                        <select id="locationPerson" className="form-control" name="vehicle_id"
                                                onChange={this.handleInput}>
                                            {this.state.transferler.map((item) => (
                                                <option option value="" disabled selected>{item.vehicle.plaka}</option>
                                            ))}
                                            {option_2.map((item) => (
                                                <option value={item.id}>{item.plaka}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className='form-group mb-3'>
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

                                    <div>
                                        <button type="submit" id ="updatebtn" className='btn btn-primary'>Güncelle</button>
                                    </div>
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

export default TransferDuzenle;