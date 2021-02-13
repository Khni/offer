import {ADD_ITEM_TO_CART, REMOVE_ITEM_FROM_CART, CLEAR_LOCAL_CARTITEMS} from '../../types';
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
      
      
      
      case CLEAR_LOCAL_CARTITEMS:
      return {
        ...state,
        cartItems: [] 
      };
    default:
      return state;
  }
};

export default cartItemsReducer;