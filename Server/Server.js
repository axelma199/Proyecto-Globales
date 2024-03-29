// Imported required packages
const express = require('express'),
path = require('path'),
bodyParser = require('body-parser'),
cors = require('cors'),
mongoose = require('mongoose'); 
// MongoDB Databse url
var mongoDatabase = "mongodb://localhost:27017/mydb";

// Created express server
const app = express();   
mongoose.Promise = global.Promise;

// Connect Mongodb Database
mongoose.connect(mongoDatabase, { useNewUrlParser: true ,
    useUnifiedTopology: true }).then(
() => { console.log('Database is connected') },
err => { console.log('There is problem while connecting database ' + err) }
);

// All the express routes
const customerRoutes = require('../Routes/Customer.route');
const productRoutes = require('../Routes/Product.route');
const orderRoutes = require('../Routes/Order.route');
const calendarRoutes = require('../Routes/Calendar.route');
// Conver incoming data to JSON format
app.use(bodyParser.json());

// Enabled CORS
app.use(cors());

// Setup for the server port number
const port = process.env.PORT || 3001;
  
// Routes Configuration
app.use('/customers', customerRoutes);
app.use('/products', productRoutes);
app.use('/calendar', calendarRoutes);
app.use('/orders', orderRoutes);

// Staring our express server
const server = app.listen(port, function () {
console.log('Server Listening On Port : ' + port);
});