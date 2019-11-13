import React, { Component } from 'react';
 import axios from 'axios';
 
 const customStyle = {
    width: '300px',
    margin: '0 auto',
    backgroundColor: '#F8F5EF', 
   // border: '5px solid black'

 }
 
 class EditProduct extends Component {
 constructor(props) {
 super(props); 
 this.state = {
 id: '',   
 code: '',
 name: '',
 price: '',
 quantity: '',
 description: ''
 }
 }
 
 componentDidMount = () => {
 this.getCustomerById();
 }

 // To get customer based on ID
 getCustomerById() {
 axios.get('http://localhost:3001/products/editProducts/' + this.props.match.params.id)
 .then((response) => {
 this.setState({
id: response.data.id,
 code: response.data.code,
 name: response.data.name,
 price: response.data.price,
 quantity: response.data.quantity,
 description: response.data.description,
 });
 })
 .catch((error) => {
 console.log(error);
 })
 }
 
 handleChange = (event) => {
 this.setState({ [event.target.name]: event.target.value });
 }
 
 // To update the record on submit
 handleSubmit = (event) => {
 event.preventDefault();
const { id ,code, name, price, quantity ,description} = this.state;
 axios.post('http://localhost:3001/products/updateProduct/' + this.props.match.params.id, {
 id: id,
 code: code,
 name: name,
 price: price,
 quantity: quantity,
 description: description,
 })
 .then((response) => {
 console.log(response);
 this.props.history.push('/');
 })
 .catch((error) => {
 console.log(error);
 console.log("siiiiiii  "+this.props.match.params.id);

 });
 
 }
 
 render() {
 return (
 <div className="container">
 <form style={customStyle} onSubmit={this.handleSubmit}>
 <h3> Modificar Cliente</h3>

 <label>
 id
 <input
 name="id"
 type="number"
 value={this.state.id || ''}
 onChange={this.handleChange}
 className="form-control"
 />
 </label>
 <br />
 <label>
 Código
 <input
 name="code"
 type="text"
 value={this.state.code || ''}
 onChange={this.handleChange}
 className="form-control"
 />
 </label>
 <br />
 
 <label>
Nombre
 <input
 name="name"
 type="text"
 value={this.state.name || ''}
 onChange={this.handleChange}
 className="form-control"
 />
 </label>
 <br />
 <label>
 Precio
 <input
 name="price"
 type="number"
 value={this.state.price || ''}
 onChange={this.handleChange}
 className="form-control"
 />
 </label>
 <br />
 <label>
Cantidad
 <input
 name="quantity"
 type="number"
 value={this.state.quantity || ''}
 onChange={this.handleChange}
 className="form-control"
 />
 </label>
 <br />
 <label>
 Desripción
 <input
 name="description"
 type="text"
 value={this.state.description || ''}
 onChange={this.handleChange}
 className="form-control"
 />
 </label>
 <br />
 <input
 type="submit"
 value="submit"
 className="btn btn-primary"
 />
 </form>
 </div>
 );
 }
 }
 
 export default EditProduct;