import React, { Component } from 'react';
 import { Switch, Route } from 'react-router-dom'; 


 // Our all component files
 import ListCustomer from '../Components/ListCustomer';
 import AddCustomer from '../Components/AddCustomer';
 import EditCustomer from '../Components/EditCustomer';
 import MainPage from '../Components/MainPage';

 class Main extends Component {
     

 render() { 

 return (
 <main>
 
 <Switch>       
 
 <Route path='/listcustomer' component={ListCustomer} /> 
 <Route path='/editcustomer/:id' component={EditCustomer} />
 <Route path='/addcustomer' component={AddCustomer} />
  <Route path='/MainPage' component={MainPage} />
 </Switch>
 </main>
 );
 }
 }
 
 export default Main;