import axios from 'axios';
import React, {Component} from 'react';
import {Link} from 'react-router-dom'
class Yolcu extends Component{

    state={
       yolcular:[],
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

    render(){
        var yolcu_HTMLTABLE=""
        if(this.state.loading){

            yolcu_HTMLTABLE= <tr><td colSpan="7"><h2>Yükleniyor..</h2></td></tr>

        }
        else{

            yolcu_HTMLTABLE=this.state.yolcular.map((item)=>{

                return(
                    <tr key ={item.id}>
                        <td>{item.id}</td>
                        <td>{item.ad}</td>
                        <td>{item.soyad}</td>
                        <td>{item.numara}</td>
                        <td>{item.tip}</td> 
                        <td>
                           <Link to ={`Yolcu_duzenle/${item.id}`} className="btn btn-success btn-sm">Düzenle
                           </Link> 
                        </td>
                        <td>
                            <button type="button"className='btn btn-danger btn-sm'>Sil</button>

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
                                    Yolcular
                                    <Link to={"./Yolcu_Ekle"}className="btn btn-primary btn-sm float-end">Yolcu Ekle</Link>
                                </h4>
                            </div>
                               
                               <div className="card-body">

                                   <table className='table table-bordered table-striped'>
                                       <thead>
                                           <tr>
                                               <th>ID</th>
                                               <th>Adı</th>
                                               <th>Soyadı</th>
                                               <th>Numarası</th>
                                               <th>Tipi</th>
                                               <th>Düzenle</th>
                                               <th>Sil</th>
                                           </tr>
                                       </thead>
                                       <tbody>
                                               {yolcu_HTMLTABLE}
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

export default Yolcu;