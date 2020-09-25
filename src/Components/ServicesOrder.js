import axios from 'axios';
 
class OrderService {
 deleteOrder(id) { 

axios.get('http://localhost:3001/orders/deleteOrder/'+ id)
.then(() => {
console.log('Order Deleted !!!')
})
.catch((error) => {
console.log(error)
})
}
}

export default OrderService;