import {ADD_ITEM_TO_CART, REMOVE_ITEM_FROM_CART} from '../types/cartTypes';
import { addItemToCart, removeItemFromCart } from './cart.utils';



const INITIAL_STATE = {
  
  cartItems: [] 
};

const cartItemsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ADD_ITEM_TO_CART :
      return {
     ...state,
        cartItems: addItemToCart(state.cartItems, action.item)
      };
      case REMOVE_ITEM_FROM_CART:
      return {
        ...state,
        cartItems: removeItemFromCart(state.cartItems, action.item)
      };
    default:
      return state;
  }
};

export default cartItemsReducer;