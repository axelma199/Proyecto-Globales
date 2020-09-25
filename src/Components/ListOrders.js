import React, { Component } from 'react';
import axios from 'axios';
import { Table, Button } from 'react-bootstrap';
// To use routing functionalities
import { Link } from 'react-router-dom';
import '../index.css';
import orderService from './ServicesOrder';
 
 var divStyle = {
 margin: '8% 8%',
 backgroundColor: '#F8F5EF', 
 //border: '5px solid black'
 };
 
 var divStyle2 = {
  position:'relative',
  left: '280px'
  };

 class ListOrders extends Component {
 
 constructor(props) {
   console.log("atlantis");
 super(props);
 this.orderService = new orderService();
 this.state = {
 orders: [],
 name: ''
 }
 this.deleteOrder = this.deleteOrder.bind(this);
  
 } 
 componentDidMount = () => {
 this.getOrderList();
 }
 

 handleChange = (event) => {
  this.setState({ [event.target.name]: event.target.value });
  }

 // To get all the customers
 getOrderList() {
 axios.get('http://localhost:3001/Orders')
 .then((response) => { 
  this.setState({
 orders: response.data
 });
 })
 .catch((error) => {
 console.log(error);
 })
 }
 

 
 findOrder(id){
  console.log(id); 
  axios.get('http://localhost:3001/orders/findorder/' + id )
  .then((response) => {

    this.setState({
 orders: response.data 
      });
      
  })
   .catch((error) => {
   console.log("error");
   })
  

 }
 
 

 // To delete any customer
 deleteOrder(empid) { 
 this.orderService.deleteOrder(empid);
 this.getOrderList();
 }
 
 render() {
 const { orders } = this.state; 
 return (
  

 <div style={divStyle}>
        <h1>Mantenimiento de Pedidos</h1>
      <Link to={"Addorder/"} className="btn btn-primary">Agregar Pedido</Link>
     
     
  
            <label style={divStyle2}>
 Buscar pedido por codigo 
 <input
 name="name"
 type="text"  
 value={this.state.name}
 onChange={this.handleChange}
 className="form-control"/>    
   </label>
 <Button onClick={() => this.findOrder(this.state.name)} bsstyle="danger"  style={divStyle2} >Buscar</Button>
 
 <Table responsive>
 <thead>
 <tr>
 <th>#</th>
 <th>Codigo</th>
 <th>Cliente</th>
 <th>Articulo</th>
 <th>Cantidad</th>
 <th>Fecha de Entrega</th>
 <th>Estado</th>
 <th>Comentario</th>
 <th></th>
 </tr>
 </thead>
 <tbody>
 {
 orders && orders.map((order, i) => {
 return (
 <tr key={i}>
 <td>{i+1}</td>
 <td>{order.id}</td>
 <td>{order.cliente}</td>
 <td>{order.articulo}</td>
 <td>{order.cantidad}</td>
 <td>{order.f_entrega}</td>
 <td>{order.estado}</td>
 <td>{order.comentario}</td>
 <td>
 <Link to={"editorder/" + order._id} className="btn btn-primary">Editar</Link>
 </td>
 <td>
 <Button onClick={() => this.deleteOrder(order._id)} bsstyle="danger" >Eliminar</Button>
 </td>
 </tr>
 )
 })
 }
 </tbody>
 </Table>

 
 </div>
 );
 } 
 }
 
 export default ListOrders;