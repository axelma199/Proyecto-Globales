import React, { Component } from 'react';
 import axios from 'axios';
 
 const customStyle = {
 width: '300px',
 margin: '0 auto',
 backgroundColor: '#F8F5EF', 
 //border: '5px solid black'
 }
 
 class AddCustomer extends Component {
 constructor(props) {
 super(props);
 this.state = {
 id:'',    
 firstName: '',
 lastName: '',
 email: '',
 phone: '',
 address: ''
 }
 }
 
 // When value changes of the fields
 handleChange = (event) => {
 this.setState({ [event.target.name]: event.target.value });
 }
 
 // To add new customer when user submits the form
 handleSubmit = (event) => {
 event.preventDefault();
 const { id, firstName, lastName, email, phone, address } = this.state;
 axios.post('http://localhost:3001/customers/addCustomer', {
 id: id,
 firstName: firstName,
 lastName: lastName,
 email: email,
 phone: phone,
 address:address
 })
 .then((response) => {
 console.log(response);
 this.props.history.push('/');
 })
 .catch((error) => {
 console.log(error);
 });
 }
 
 render() {
 return (
 <div className="container">
  <form style={customStyle} onSubmit={this.handleSubmit}>
  <h3> Nuevo Cliente</h3>

  <label>
Cédula
 <input
 name="id"
 type="number"
 value={this.state.id}
 onChange={this.handleChange}
 className="form-control"
 />
 </label>
 <br />
 <label>
Nombre
 <input
 name="firstName"
 type="text"
 value={this.state.firstName}
 onChange={this.handleChange}
 className="form-control"
 />
 </label>
 <br />
 <label>
 Apellido
 <input
 name="lastName"
 type="text"
 value={this.state.lastName}
 onChange={this.handleChange}
 className="form-control"
 />
 </label>
 <br />
 <label>
 Email
 <input
 name="email"
 type="text"
 value={this.state.email}
 onChange={this.handleChange}
 className="form-control"
 />
 </label>
 <br />
 <label>
Teléfono
 <input
 name="phone"
 type="number"
 value={this.state.phone}
 onChange={this.handleChange}
 className="form-control"
 />
 </label>
 <br />
 <label>
Dirección
 <input
 name="address"
 type="text"
 value={this.state.address}
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

 export default AddCustomer;
