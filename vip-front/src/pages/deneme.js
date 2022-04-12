import React, {Component} from 'react';
import {Link} from 'react-router-dom'
import axios from 'axios';

class TransferEkle extends Component{


    state={
        yolcular:[],
        saat:[],
        loading:true,
    }



    async componentDidMount(){

        const res= await axios.get('http://127.0.0.1:8000/api/yolcular');
        if(res.data.status===200){
            this.setState({
                yolcular:res.data.yolcular,
                loading:false,
            });


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
                saat:[],
                yolcular:[],
            });
        }
    }

    render(){
        return(
            <div>
                {this.state.yolcular.map((item,index)=> {
                    const options=[
                        {
                            id:item.id,
                            ad:item.ad,
                            soyad:item.soyad,
                            numara:item.numara,
                            tip:item.tip,
                        }

                    ]

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
                                                <div className='form-group mb-3'>
                                                    <label>Kalkış Saati</label>
                                                    <input type="text" name="saat" onChange={this.handleInput}
                                                           value={this.state.saat} className='form-control'/>
                                                </div>
                                                <div className='form-group mb-3'>
                                                    <select value={this.state.yolcular} onChange={this.handleInput}>
                                                        {options.map((option) => (
                                                            <option value={option.value}>{option.id}{option.ad}</option>

                                                        ))}

                                                    </select>
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
                })}
            </div>

        );

    }

}

export default TransferEkle;

<div className='form-group mb-3'>
    <label>Yolcu</label>
    <select value={this.state.yolcular} onChange={this.handleInput} multiple={false}>
        {option.map((item,index) => (
            <option key ={item.id} value={item.value}>{item.ad}</option>

        ))}
    </select>