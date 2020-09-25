import React, { Component } from 'react';
import Header from './Components/Header';
 import Main from './Components/Main';
 import logo from './logo.png';

 class App extends Component {
 render() {
    let links = [
        { label: 'Home', link: '../MainPage', active: true },
        { label: 'Calendario', link: '../Calendar' },
        { label: 'Clientes', link: '../ListCustomer' },
        { label: 'Pedidos', link: '../ListOrders' },
        { label: 'Productos', link: '../ListProduct' },
        { label: 'Acerca de', link: '../Components/Prueba' },
      ];
  
 return (
 <div  className="container center">   
      <Header links={links} logo={logo}/> 
      <Main /> 

 </div>
 );
 }
 }
 
 export default App;