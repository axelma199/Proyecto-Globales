 // Importing important packages
 const express = require('express');
 
 // Using express and routes
 const app = express();
 const orderRoute = express.Router();
 
 // order module which is required and imported
 let orderModel = require('../Model/Order');
 
 orderRoute.route('/findorder/:id').get(function (req, res) {
  orderModel.find({ id: req.params.id },function (err, order) {
        console.log({ _id: req.params.id });

    if (err) {
        console.log(err);
    }
    else {
      //  res.json();
      res.json( order);

    }
    });
    });


 // To Get List Of Orders
 orderRoute.route('/').get(function (req, res) {
 orderModel.find(function (err, order) {
 if (err) {
 console.log(err);
 }
 else {
 res.json(order);
 }
 });
 });
 
 // To Add New order
 orderRoute.route('/addOrder').post(function (req, res) {
     
 let order = new orderModel(req.body);
 order.save()
 .then(game => { 
 res.status(200).json({ 'order': 'Order Added Successfully' });
 })
 .catch(err => { 
 res.status(400).send("Something Went Wrong");
 });
 });
 
 // To Get order Details By order ID
 orderRoute.route('/editOrder/:id').get(function (req, res) {
 let id = req.params.id;
 orderModel.findById(id, function (err, order) {
 res.json(order);
 });
 });
 
 // To Update The order Details
 orderRoute.route('/updateOrder/:id').post(function (req, res) {
orderModel.findById(req.params.id, function (err, order) {
 if (!order)
 return next(new Error('Unable To Find order With This Id'));
 else {
    order.cliente = req.body.cliente;
    order.articulo = req.body.articulo;
    order.cantidad = req.body.cantidad;
    order.f_entrega = req.body.f_entrega;
    order.id = req.body.id;
    order.estado = req.body.estado;
    order.comentario = req.body.comentario;
 
    order.save().then(emp => {
 res.json('Order Updated Successfully');
 })
 .catch(err => {
 res.status(400).send("Unable To Update Order");
 });
 }
 });
 });
 
 // To Delete The Order
 orderRoute.route('/deleteOrder/:id').get(function (req, res) {
 orderModel.findByIdAndRemove({ _id: req.params.id }, function (err, order) {
 if (err) console.log(err);
 else console.log('Order Deleted Successfully');
 });
 });
 
 module.exports = orderRoute;