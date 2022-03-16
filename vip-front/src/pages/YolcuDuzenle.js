import React, {Component} from 'react';
import {Link} from 'react-router-dom'
import axios from 'axios';
class YolcuDuzenle extends Component{

    state={
        ad:'',
        soyad:'',
        numara:'',
        tip:'',
    }
    handleInput=(e) =>{
        this.setState({
            [e.target.name]:e.target.value
        });
    }
    async componentDidMount(){

        const yolcu_id=this.props.match.params.id;
        console.log(yolcu_id);
        const res= await axios.get(`http://127.0.0.1:8000/api/Yolcu_duzenle/${yolcu_id}`);
        if(res.data.status===200){
            this.setState({
                ad: res.data.yolcu.ad,
                soyad:res.data.yolcu.soyad,
                numara:res.data.yolcu.numara,
                tip:res.data.yolcu.tip,
            });
        }

    }
    saveYolcu= async(e)=>{
        e.preventDefault();
        document.getElementById('updatebtn').disabled=true;
        document.getElementById('updatebtn').innerText="Güncelleniyor";
        const yolcu_id=this.props.match.params.id;
        const res = await axios.put(`http://127.0.0.1:8000/api/Yolcu_Guncelle/${yolcu_id}`,this.state)
        if(res.data.status===200){
            console.log(res.data.message);
            document.getElementById('updatebtn').disabled=false;
            document.getElementById('updatebtn').innerText="Güncellendi";
        }
    }

    render(){
        return(
            <div className="container">
                <div className='row'>
                    <div className='col-md-6'>
                        <div className='card'>
                            <div className='card-header'>
                                <h4>
                                    Yolcu Düzenle
                                    <Link to={'/'}className="btn btn-primary btn-sm float-end">Geri</Link>
                                </h4>
                            </div>
                               
                               <div className='card-body'>
                                   <form onSubmit={this.saveYolcu}> 
                                       <div className='form-group mb-3'>
                                           <label>Yolcu Adı</label>
                                           <input type="text" name="ad" onChange={this.handleInput} value={this.state.ad} className='form-control'/>

                                        </div>
                                        <div className='form-group mb-3'>
                                           <label>Yolcu Soyadı</label>
                                           <input type="text" name="soyad" onChange={this.handleInput} value={this.state.soyad} className='form-control'/>

                                        </div>
                                        <div className='form-group mb-3'>
                                           <label>Telefon Numarası</label>
                                           <input type="text" name="numara" onChange={this.handleInput} value={this.state.numara} className='form-control'/>

                                        </div>
                                        <div className='form-group mb-3'>
                                           <label>Yolcu Tipi</label>
                                           <input type="text" name="tip" onChange={this.handleInput} value={this.state.tip} className='form-control'/>
                                        </div>
                                        <div>
                                            <button type="submit" id ="updatebtn" className='btn btn-primary'>Güncelle</button>
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

export default YolcuDuzenle;