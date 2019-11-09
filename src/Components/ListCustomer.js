import React, { Component } from 'react';
import axios from 'axios';
import { Table, Button } from 'react-bootstrap';
// To use routing functionalities
import { Link } from 'react-router-dom';
import '../index.css';
import CustomerService from './Services';
 
 var divStyle = {
 margin: '8% 8%',
 backgroundColor: '#F8F5EF', 
 //border: '5px solid black'
 };
 
 var divStyle2 = {
  position:'relative',
  left: '280px'
  };

 class ListCustomer extends Component {
 
 constructor(props) { 
 super(props);
 this.customerService = new CustomerService();
 this.state = {
 customers: [],
 name: ''
 }
 this.deleteCustomer = this.deleteCustomer.bind(this);
  
 } 
 componentDidMount = () => {
 this.getCustomerList();
 }
 

 handleChange = (event) => {
  this.setState({ [event.target.name]: event.target.value });
  }

 // To get all the customers
 getCustomerList() {
 axios.get('http://localhost:3001/customers')
 .then((response) => {
  this.setState({
 customers: response.data
 });
 })
 .catch((error) => {
 console.log(error);
 })
 }
 

 
 findCustomer(id){
  console.log(id); 
  axios.get('http://localhost:3001/customers/findcustomer/' + id )
  .then((response) => {

    this.setState({
 customers: response.data 
      });
      
  })
   .catch((error) => {
   console.log("error");
   })
  

 }
 
 

 // To delete any customer
 deleteCustomer(empid) { 
 this.customerService.deleteCustomer(empid);
 this.getCustomerList();
 }
 
 render() {
 const { customers } = this.state; 
 return (
  

 <div style={divStyle}>
        <h1>Mantenimiento de clientes</h1>
      <Link to={"addcustomer/"} className="btn btn-primary">Agregar</Link>
     
     
  
            <label style={divStyle2}>
 Buscar cliente por cédula 
 <input
 name="name"
 type="text"  
 value={this.state.name}
 onChange={this.handleChange}
 className="form-control"/>    
   </label>
 <Button onClick={() => this.findCustomer(this.state.name)} bsstyle="danger"  style={divStyle2} >Buscar</Button>
 
 <Table responsive>
 <thead>
 <tr>
 <th>#</th>
 <th>Cédula</th>
 <th>Nombre</th>
 <th>Apellidos</th>
 <th>Email</th>
 <th>Teléfono</th>
 <th>Dirección</th>
 <th></th>
 <th></th>
 </tr>
 </thead>
 <tbody>
 {
 customers && customers.map((customer, i) => {
 return (
 <tr key={i}>
 <td>{i+1}</td>
 <td>{customer.id}</td>
 <td>{customer.firstName}</td>
 <td>{customer.lastName}</td>
 <td>{customer.email}</td>
 <td>{customer.phone}</td>
 <td>{customer.address}</td>
 <td>
 <Link to={"editcustomer/" + customer._id} className="btn btn-primary">Editar</Link>
 </td>
 <td>
 <Button onClick={() => this.deleteCustomer(customer._id)} bsstyle="danger" >Eliminar</Button>
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
 
 export default ListCustomer;