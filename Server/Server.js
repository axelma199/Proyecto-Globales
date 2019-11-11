// Imported required packages
const express = require('express'),
bodyParser = require('body-parser'),
mongoose = require('mongoose'); 
var cors = require('cors')
// MongoDB Databse url
var mongoDatabase = "mongodb://localhost:27017/mydb";

// Created express server
const app = express(); 
mongoose.Promise = global.Promise;
app.use(cors())
// Connect Mongodb Database
mongoose.connect(mongoDatabase, { useNewUrlParser: true ,
    useUnifiedTopology: true }).then(
() => { console.log('Database is connected') },
err => { console.log('There is problem while connecting database ' + err) }
);

// All the express routes
const customerRoutes = require('../Routes/Customer.route');
const calendarRoutes = require('../Routes/Calendar.route');

// Conver incoming data to JSON format
app.use(bodyParser.json());


// Setup for the server port number
const port = process.env.PORT || 3001;

// Routes Configuration
app.use('/customers', customerRoutes);
app.use('/calendar', calendarRoutes);

// Staring our express server
const server = app.listen(port, function () {
console.log('Server Lisening On Port : ' + port);
});