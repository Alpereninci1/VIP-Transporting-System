import axios from 'axios';
import React, {Component} from 'react';
import {Link} from 'react-router-dom'
class Transferler extends Component{

    state={
        transferler:[],
        yolcular:[],
        araclar:[],
        loading:true,
    }



    handleInput=(e) =>{
        this.setState({
            [e.target.name]:e.target.value
        });
    }


    async componentDidMount(){

        const res= await axios.get('http://127.0.0.1:8000/api/transferler');
        if(res.data.status===200){
            this.setState({
                transferler:res.data.transferler,
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


    TransferSil= async (e,id)=>{
        const clicked = e.currentTarget;
        clicked.innerText="Siliniyor"
        const res= await axios.delete(`http://127.0.0.1:8000/api/transfer_sil/${id}`);
        if(res.data.status===200){
            clicked.closest("tr").remove();
            console.log(res.data.message);
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
        var transfer_HTMLTABLE=""
        if(this.state.loading){

            transfer_HTMLTABLE= <tr><td colSpan="7"><h2>Yükleniyor..</h2></td></tr>

        }
        else{

            transfer_HTMLTABLE=this.state.transferler.map((item)=> {


                    return (
                        <tr key={item.id}>
                            <td>{item.id}</td>
                            <td>{item.vehicle.plaka}</td>
                            <td>{item.passenger.ad+" "+ item.passenger.soyad}</td>
                            <td>{item.date}</td>
                            <td>{item.time}</td>
                            <td>{item.start_point}</td>
                            <td>{item.end_point}</td>
                            <td>
                                <Link to={`transfer_duzenle/${item.id}`} className="btn btn-success btn-sm">Düzenle
                                </Link>
                            </td>
                            <td>
                                <button type="button" onClick={(e) => this.TransferSil(e, item.id)}
                                        className='btn btn-danger btn-sm'>Sil
                                </button>

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
                                    Transferler
                                    <Link to={"./Transfer_Ekle"}className="btn btn-primary btn-sm float-end">Transfer Ekle</Link>
                                </h4>
                            </div>

                            <div className="card-body">

                                <table className='table table-bordered table-striped'>
                                    <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Araç Plakası</th>
                                        <th>Yolcu Adı</th>
                                        <th>Date</th>
                                        <th>Time</th>
                                        <th>Start Point</th>
                                        <th>End Point</th>
                                        <th>Düzenle</th>
                                        <th>Sil</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {transfer_HTMLTABLE}
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

export default Transferler;