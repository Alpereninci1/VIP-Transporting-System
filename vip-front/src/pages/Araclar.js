import axios from 'axios';
import React, {Component} from 'react';
import {Link} from 'react-router-dom'
class Araclar extends Component{

    state={
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
    }
    AracSil= async (e,id)=>{
        const clicked = e.currentTarget;
        clicked.innerText="Siliniyor"
        const res= await axios.delete(`http://127.0.0.1:8000/api/arac_sil/${id}`);
        if(res.data.status===200){
            clicked.closest("tr").remove();
            console.log(res.data.message);
        }
    }
    render(){
        var arac_HTMLTABLE=""
        if(this.state.loading){

            arac_HTMLTABLE= <tr><td colSpan="7"><h2>Yükleniyor..</h2></td></tr>

        }
        else{

            arac_HTMLTABLE=this.state.araclar.map((item)=>{

                return(
                    <tr key ={item.id}>
                        <td>{item.id}</td>
                        <td>{item.marka}</td>
                        <td>{item.plaka}</td>
                        <td>{item.surucu}</td>
                        <td>
                            <Link to ={`arac_duzenle/${item.id}`} className="btn btn-success btn-sm">Düzenle
                            </Link>
                        </td>

                        <td>
                            <button type="button" onClick={(e)=>this.AracSil(e,item.id)} className='btn btn-danger btn-sm'>Sil</button>

                        </td>

                    </tr>
                )
            });

        }
        return(
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <div className="card">
                            <div className="card-header">
                                <h4>
                                    Araçlar
                                    <Link to={"./Arac_Ekle"}className="btn btn-primary btn-sm float-end">Araç Ekle</Link>
                                </h4>
                            </div>

                            <div className="card-body">

                                <table className='table table-bordered table-striped'>
                                    <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Markası</th>
                                        <th>Plakası</th>
                                        <th>Şoför</th>
                                        <th>Düzenle</th>
                                        <th>Sil</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {arac_HTMLTABLE}
                                    </tbody>
                                </table>

                            </div>
                        </div>

                    </div>
                </div>

            </div>

        );
    }

}

export default Araclar;