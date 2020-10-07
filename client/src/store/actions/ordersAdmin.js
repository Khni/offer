import {FETCH_ORDERS_ADMIN} from '../types/ordersAdminType'
import axios from 'axios'

export const fetchAllOrders = (adminToken,status) => {

      //  let OrderStatus = status
      //  if (status == 'all') {
      //   OrderStatus= ''
      //  }
    return async dispatch => {
        try {
            console.log('status from action'+ status);
            const response =   await axios.get('/api/admin/orders/'+ status, {
             headers : { Authorization: `Bearer ${adminToken}`
              }} );
   
  console.log('response' +response.data.orders);
  
        dispatch({
          type: FETCH_ORDERS_ADMIN, 
          orders : response.data.orders
          
        });
       
      } catch(err) {
      // console.log();
          console.error("err"+ err.response.data.error)
        dispatch({
          type: "ERR",
     //     payload: err.response.data.error
        })
      }
    };
  }