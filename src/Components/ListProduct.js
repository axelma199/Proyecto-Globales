import React, { Component } from 'react';
import axios from 'axios';
import { Table, Button } from 'react-bootstrap';
// To use routing functionalities
import { Link } from 'react-router-dom';
import '../index.css';
import ProductService from './Services';
 
 var divStyle = {
 margin: '8% 8%',
 backgroundColor: '#F8F5EF', 
 //border: '5px solid black'
 };
 
 var divStyle2 = {
  position:'relative',
  left: '280px'
  };

 class ListProduct extends Component {
 
 constructor(props) { 
 super(props);
 this.productService = new ProductService();
 this.state = {
 products: [],
 name: ''
 }
 this.deleteProduct = this.deleteProduct.bind(this);
  
 } 
 componentDidMount = () => {
 this.getProductList();
 }
 

 handleChange = (event) => {
  this.setState({ [event.target.name]: event.target.value });
  }

 // To get all the Products
 getProductList() {
 axios.get('http://localhost:3001/products')
 .then((response) => {
  this.setState({
 products: response.data
 });
 })
 .catch((error) => {
 console.log(error);
 })
 }
 

 
 findProduct(id){
  console.log(id); 
  axios.get('http://localhost:3001/products/findproduct/' + id )
  .then((response) => {

    this.setState({
 products: response.data 
      });
      
  })
   .catch((error) => {
   console.log("error");
   })
  

 }
 
 

 // To delete any product
 deleteProduct(empid) { 
 this.productService.deleteProduct(empid);
 this.getProductList();
 }
 
 render() {
 const { products } = this.state; 
 return (
  

 <div style={divStyle}>
        <h1>Mantenimiento de productos</h1>
      <Link to={"addproduct/"} className="btn btn-primary">Agregar</Link>
     
     
  
            <label style={divStyle2}>
 Buscar Producto por id 
 <input
 name="name"
 type="text"  
 value={this.state.name}
 onChange={this.handleChange}
 className="form-control"/>    
   </label>
 <Button onClick={() => this.findProduct(this.state.name)} bsstyle="danger"  style={divStyle2} >Buscar</Button>
 
 <Table responsive>
 <thead>
 <tr>
 <th>#</th>
 <th>id</th>
 <th>Nombre</th>
 <th>Precio</th>
 <th>Cantidad</th>
 <th>Descripción</th>
 <th></th>
 <th></th>
 </tr>
 </thead>
 <tbody>
 {
 products && products.map((product, i) => {
 return (
 <tr key={i}>
 <td>{i+1}</td>
 <td>{product.id}</td>
 <td>{product.name}</td>
 <td>{product.price}</td>
 <td>{product.quantity}</td>
 <td>{product.description}</td>
 <td>
 <Link to={"editproduct/" + product._id} className="btn btn-primary">Editar</Link>
 </td>
 <td>
 <Button onClick={() => this.deleteProduct(product._id)} bsstyle="danger" >Eliminar</Button>
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
 
 export default ListProduct;