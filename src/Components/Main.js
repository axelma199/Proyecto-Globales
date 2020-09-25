import React, { Component } from 'react';
 import { Switch, Route } from 'react-router-dom'; 


 // Our all component files
 import ListCustomer from '../Components/ListCustomer';
 import AddCustomer from '../Components/AddCustomer';
 import EditCustomer from '../Components/EditCustomer';
 import ListProduct from '../Components/ListProduct';
 import AddProduct from '../Components/AddProduct';
 import EditProduct from '../Components/EditProduct';
 import ListOrder from '../Components/ListOrders';
 import AddOrder from '../Components/AddOrder';
 import EditOrder from '../Components/EditOrder';
 import MainPage from '../Components/MainPage';
 import DemoCarousel from '../Components/DemoCarousel';
 import Calendar from '../Components/Calendar';

 class Main extends Component {
     

 render() { 

 return (
 <main>
 
 <Switch>       
 
 
 
 <Route path='/listcustomer' component={ListCustomer} /> 
 <Route path='/editcustomer/:id' component={EditCustomer} />
 <Route path='/addcustomer' component={AddCustomer} />
 <Route path='/listproduct' component={ListProduct} /> 
 <Route path='/editproduct/:id' component={EditProduct} />
 <Route path='/addproduct' component={AddProduct} />
  <Route path='/MainPage' component={MainPage} />
  <Route path='/DemoCarousel' component={DemoCarousel} />
  <Route path='/listorders' component={ListOrder} /> 
 <Route path='/editorder/:id' component={EditOrder} />
 <Route path='/addorder' component={AddOrder} />
   

 </Switch>
 </main>
 );
 }
 }
 
 export default Main;