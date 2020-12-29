import { 
  // MAKE_ORDER, 
  FETCH_ORDERS
} from '../../types/authUserTypes';

const DEFAULT_STATE = {
    
     orders: [] 
  }
  
  export default (state = DEFAULT_STATE, action) => {
    switch(action.type) {
      
          case FETCH_ORDERS:
        return { ...state, orders: action.orders}

      default:
        return state
    }
  }