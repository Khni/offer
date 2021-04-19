import {FETCH_ORDERS_ADMIN
  //  , FETCH_ORDERS_ERRROR
  } from '../../../types/ordersAdminType';


const INITIAL_STATE = {
  orders: [],
  ordersFetched: false
};

const ordersReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_ORDERS_ADMIN :
      return {
     ...state, 
     orders: action.orders,
     ordersFetched: true
       
      };

    //   case FETCH_ORDERS_ADMIN :
    //   return {
    //  ...state, 
    //  orders: action.orders,
    //  ordersFetched: true
       
    //   };
      
      
    default:
      return state;
  }

  
};

export default ordersReducer;