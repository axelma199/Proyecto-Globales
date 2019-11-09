const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// List of columns for Customer schema
let Customer = new Schema({
id: {
   type: Number
        },   
firstName: {
type: String
},
lastName: {
type: String
},
email: {
type: String
},
phone: {
type: Number
},
address: {
        type: String
        }
},{
collection: 'customers'
});

module.exports = mongoose.model('Customer', Customer);