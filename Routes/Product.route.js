 // Importing important packages
 const express = require('express');
 
 // Using express and routes
 const app = express();
 const productRoute = express.Router();
 
 // Product module which is required and imported
 let productModel = require('../Model/Product');
 
 productRoute.route('/findproduct/:id').get(function (req, res) {
  productModel.find({ id: req.params.id },function (err, product) {
        console.log({ _id: req.params.id });

    if (err) {
        console.log(err);
    }
    else {
      //  res.json();
      res.json(product);

    }
    });
    });


 // To Get List Of Products
 productRoute.route('/').get(function (req, res) {
 productModel.find(function (err, product) {
 if (err) {
 console.log(err);
 }
 else {
 res.json(product);
 }
 });
 });
 
 // To Add New product
 productRoute.route('/addProduct').post(function (req, res) {
     
 let product = new productModel(req.body);
 product.save()
 .then(game => { 
 res.status(200).json({ 'product': 'Product Added Successfully' });
 })
 .catch(err => { 
 res.status(400).send("Something Went Wrong");
 });
 });
 
 // To Get product Details By product ID
 productRoute.route('/editProduct/:id').get(function (req, res) {
 let id = req.params.id;
 productModel.findById(id, function (err, product) {
 res.json(product);
 });
 });
 
 // To Update The product Details
 productRoute.route('/updateProduct/:id').post(function (req, res) {
productModel.findById(req.params.id, function (err, product) {
 if (!product)
 return next(new Error('Unable To Find product With This Id'));
 else {
    product.id = req.body.id;
    product.code = req.body.code;
    product.name = req.body.name;
    product.price = req.body.price;
    product.quantity = req.body.quantity;
    product.description = req.body.description;
 
    product.save().then(emp => { 
 res.json('Product Updated Successfully');
 })
 .catch(err => {
 res.status(400).send("Unable To Update Product");
 });
 }
 });
 });
 
 // To Delete The Product
productRoute.route('/deleteProduct/:id').get(function (req, res) {
 productModel.findByIdAndRemove({ _id: req.params.id }, function (err, product) {
 if (err) console.log(err);
 else console.log('Product Deleted Successfully');
 });
 });
 
 module.exports = productRoute;