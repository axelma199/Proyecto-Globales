import axios from 'axios';
 
class CustomerService {
 deleteCustomer(id) { 

axios.get('http://localhost:3001/customers/deleteCustomer/'+ id)
.then(() => {
console.log('Customer Deleted !!!')
})
.catch((error) => {
console.log(error)
})
}
}

export default CustomerService;