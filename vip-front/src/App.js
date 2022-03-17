import React from 'react';
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom'
import Yolcu from './pages/Yolcu';
import YolcuEkle from './pages/YolcuEkle';
import YolcuDuzenle from './pages/YolcuDuzenle';
import Araclar from './pages/Araclar';
import Suruculer from './pages/Suruculer';
import Transferler from './pages/Transferler';
import Navbar from './pages/Navbar';
function App() {
  return (
      <Router>
          <Navbar/>
          <Switch>
              <Route path ="/" exact component={Yolcu}/>
              <Route path ='/Yolcu_Ekle' component={YolcuEkle}/>
              <Route path='/Yolcu_duzenle/:id'component={YolcuDuzenle}/>
              <Route path='/araclar'component={Araclar}/>
              <Route path='/suruculer'component={Suruculer}/>
              <Route path='/transferler'component={Transferler}/>
          </Switch>
     </Router>
  );
}

export default App;
