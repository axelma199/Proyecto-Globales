const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// List of columns for Customer schema
let Order = new Schema({
id: {
   type: Number
        },   
cliente: {
type: String
},
articulo: {
type: String
},
cantidad: {
type: String
},
f_entrega: {
type: Number
},
estado: {
    type: Number
    },
comentario: {
        type: String
        }
},{
collection: 'Order'
});

module.exports = mongoose.model('Order', Order);