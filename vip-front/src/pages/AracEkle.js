import React, {Component} from 'react';
import {Link} from 'react-router-dom'
import axios from 'axios';
class AracEkle extends Component{

    state={
        marka:'',
        plaka:'',
        surucu:'',

    }
    handleInput=(e) =>{
        this.setState({
            [e.target.name]:e.target.value
        });
    }

    saveArac= async(e)=>{
        e.preventDefault();

        const res = await axios.post('http://127.0.0.1:8000/api/Arac_Ekle',this.state)
        if(res.data.status===200){

            console.log(res.data.message);
            this.setState({
                marka:'',
                plaka:'',
                surucu:'',

            });
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
                                    Arac Ekle
                                    <Link to={'/'}className="btn btn-primary btn-sm float-end">Geri</Link>
                                </h4>
                            </div>

                            <div className='card-body'>
                                <form onSubmit={this.saveArac}>
                                    <div className='form-group mb-3'>
                                        <label>Araç Markası</label>
                                        <input type="text" name="marka" onChange={this.handleInput} value={this.state.marka} className='form-control'/>

                                    </div>
                                    <div className='form-group mb-3'>
                                        <label>Araç Plakası</label>
                                        <input type="text" name="plaka" onChange={this.handleInput} value={this.state.plaka} className='form-control'/>

                                    </div>
                                    <div className='form-group mb-3'>
                                        <label>Sürücü Adı</label>
                                        <input type="text" name="surucu" onChange={this.handleInput} value={this.state.surucu} className='form-control'/>

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

export default AracEkle;