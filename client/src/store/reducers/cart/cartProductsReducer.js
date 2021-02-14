import {FETCH_CART
, ERROR_FETCH_CART
} from '../../types';
// import { addItemToCart, removeItemFromCart } from './cart.utils';



const INITIAL_STATE = {
  
  cartProducts: [], 
  fetchError: '', 
  isLoading: false, 
  updateCart: false
};

const cartProductsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_CART :
      return {
     ...state,
        cartProducts: action.cart, 
        isLoading: false, 
        updateCart: false
      };
      
      case ERROR_FETCH_CART :
      return {
     ...state,
        fetchError: action.error
      };
      
    default:
      return state;
  }
};

export default cartProductsReducer;