 // Importing important packages
 const express = require('express');
 
 // Using express and routes
 const app = express();
 const customerRoute = express.Router();
 
 // Customer module which is required and imported
 let customerModel = require('../Model/Customer');
 
 customerRoute.route('/findcustomer/:id').get(function (req, res) {
  customerModel.find({ id: req.params.id },function (err, customer) {
        console.log({ _id: req.params.id });

    if (err) {
        console.log(err);
    }
    else {
      //  res.json();
      res.json( customer);

    }
    });
    });


 // To Get List Of Customers
 customerRoute.route('/').get(function (req, res) {
 customerModel.find(function (err, customer) {
 if (err) {
 console.log(err);
 }
 else {
 res.json(customer);
 }
 });
 });
 
 // To Add New customer
 customerRoute.route('/addCustomer').post(function (req, res) {
     
 let customer = new customerModel(req.body);
 customer.save()
 .then(game => { 
 res.status(200).json({ 'customer': 'Customer Added Successfully' });
 })
 .catch(err => { 
 res.status(400).send("Something Went Wrong");
 });
 });
 
 // To Get customer Details By customer ID
 customerRoute.route('/editCustomer/:id').get(function (req, res) {
 let id = req.params.id;
 customerModel.findById(id, function (err, customer) {
 res.json(customer);
 });
 });
 
 // To Update The customer Details
 customerRoute.route('/updateCustomer/:id').post(function (req, res) {
customerModel.findById(req.params.id, function (err, customer) {
 if (!customer)
 return next(new Error('Unable To Find customer With This Id'));
 else {
    customer.firstName = req.body.firstName;
    customer.lastName = req.body.lastName;
    customer.email = req.body.email;
    customer.phone = req.body.phone;
    customer.id = req.body.id;
    customer.address = req.body.address;
 
    customer.save().then(emp => { 
 res.json('Customer Updated Successfully');
 })
 .catch(err => {
 res.status(400).send("Unable To Update Customer");
 });
 }
 });
 });
 
 // To Delete The Customer
 customerRoute.route('/deleteCustomer/:id').get(function (req, res) {
 customerModel.findByIdAndRemove({ _id: req.params.id }, function (err, customer) {
 if (err) console.log(err);
 else console.log('Customer Deleted Successfully');
 });
 });
 
 module.exports = customerRoute;