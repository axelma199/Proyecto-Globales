import React, { Component } from 'react';
import Inicio from '../Components/Inicio';
import Logo from'../Components/descarga1.jpg';
import Logo2 from'../Components/descarga2.jpg';
import Logo3 from'../Components/descarga3.jpg';
import Logo4 from'../Components/descarga4.jpg';

 class MainPage extends Component {
  
 render() {
 return (   
      <div  className="container center"> 

    <Inicio/>
    <img src={Logo}/>
    <img src={Logo2}/>
    <img src={Logo3}/>
     <img src={Logo4}/>
  </div>

 );
 }
 }

 export default MainPage;
