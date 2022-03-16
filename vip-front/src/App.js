import React from 'react';
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom'
import Yolcu from './pages/Yolcu';
import YolcuEkle from './pages/YolcuEkle';
import YolcuDuzenle from './pages/YolcuDuzenle'
function App() {
  return (
    <Router>
      <Switch>
        <Route exact path ="/" component={Yolcu}/>
        <Route path ='/Yolcu_Ekle' component={YolcuEkle}/>
        <Route path='/Yolcu_duzenle/:id'component={YolcuDuzenle}/>
      </Switch>
    </Router>
  );
}

export default App;
