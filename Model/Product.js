const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// List of columns for Product schema
let Customer = new Schema({
id: {
   type: Number
        },   
code: {
type: String
},
name: {
type: String
},
price: {
type: Number
},
quantity: {
type: Number
},
description: {
        type: String
        }
},{
collection: 'products'
});

module.exports = mongoose.model('Product', Product);