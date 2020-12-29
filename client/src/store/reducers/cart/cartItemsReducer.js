import {ADD_ITEM_TO_CART, REMOVE_ITEM_FROM_CART, CHECKOUT_FINISHED} from '../../types/cartTypes';
// import { addItemToCart, removeItemFromCart } from './cart.utils';



const INITIAL_STATE = {
  
  cartItems: [] 
};

const cartItemsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ADD_ITEM_TO_CART :
      return {
     ...state,
        cartItems: action.items
      };
      case REMOVE_ITEM_FROM_CART:
      return {
        ...state,
        cartItems: action.items
      };
      
      
      
      case CHECKOUT_FINISHED:
      return {
        ...state,
        cartItems: [] 
      };
    default:
      return state;
  }
};

export default cartItemsReducer;