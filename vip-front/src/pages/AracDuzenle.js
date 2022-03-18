import React, {Component} from 'react';
import {Link} from 'react-router-dom'
import axios from 'axios';
class  AracDuzenle extends Component{

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
    async componentDidMount(){

        const arac_id=this.props.match.params.id;
        console.log(arac_id);
        const res= await axios.get(`http://127.0.0.1:8000/api/Arac_duzenle/${arac_id}`);
        if(res.data.status===200){
            this.setState({
                marka: res.data.arac.marka,
                plaka:res.data.arac.plaka,
                surucu:res.data.araca.surucu,
            });
        }

    }
    saveArac= async(e)=>{
        e.preventDefault();
        document.getElementById('updatebtn').disabled=true;
        document.getElementById('updatebtn').innerText="Güncelleniyor";
        const arac_id=this.props.match.params.id;
        const res = await axios.put(`http://127.0.0.1:8000/api/Arac_Guncelle/${arac_id}`,this.state)
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
                                    Araç Düzenle
                                    <Link to={'/araclar'}className="btn btn-primary btn-sm float-end">Geri</Link>
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

export default AracDuzenle;