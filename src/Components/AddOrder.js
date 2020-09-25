import React, { Component } from 'react';
 import axios from 'axios';
 
 const customStyle = {
 width: '300px',
 margin: '0 auto',
 backgroundColor: '#F8F5EF', 
 //border: '5px solid black'
 }
 
 class AddOrder extends Component {
 constructor(props) {
 super(props);
 this.state = {
 id:'',    
 cliente: '',
 articulo: '',
 cantidad: '',
 f_entrega: '',
 estado: '',
 comentario: ''
 }
 }
 
 // When value changes of the fields
 handleChange = (event) => {
 this.setState({ [event.target.name]: event.target.value });
 }
 
 // To add new order when user submits the form
 handleSubmit = (event) => {
 event.preventDefault();
 const { id, cliente, articulo, cantidad, f_entrega, estado, comentario } = this.state;
 axios.post('http://localhost:3001/orders/addOrder', {
 id: id,
 cliente: cliente,
 articulo: articulo,
 cantidad: cantidad,
 f_entrega: f_entrega,
 estado: estado,
 comentario:comentario
 })
 .then((response) => {
 console.log(response);
 this.props.history.push('/');
 })
 .catch((error) => {
 console.log("error");
 });
 }
 
 render() {
 return (
 <div className="container">
  <form style={customStyle} onSubmit={this.handleSubmit}>
  <h3> Nuevo Pedido</h3>

  <label>
Codigo
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
Cliente
 <input
 name="cliente"
 type="text"
 value={this.state.cliente}
 onChange={this.handleChange}
 className="form-control"
 />
 </label>
 <br />
 <label>
 Articulo
 <input
 name="articulo"
 type="text"
 value={this.state.articulo}
 onChange={this.handleChange}
 className="form-control"
 />
 </label>
 <br />
 <label>
 Cantidad
 <input
 name="cantidad"
 type="text"
 value={this.state.cantidad}
 onChange={this.handleChange}
 className="form-control"
 />
 </label>
 <br />
 <label>
Fecha de entrega
 <input
 name="f_entrega"
 type="text"
 value={this.state.f_entrega}
 onChange={this.handleChange}
 className="form-control"
 />
 </label>
 <br />
 <label>
 Estado
 <input
 name="estado"
 type="text"
 value={this.state.estado}
 onChange={this.handleChange}
 className="form-control"
 />
 </label>
 <br />
 <label>
Comentario
 <input
 name="comentario"
 type="text"
 value={this.state.comentario}
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

 export default AddOrder;
