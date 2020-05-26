import {ADD_ITEM_TO_CART} from '../types/cartTypes';

const INITIAL_STATE = {
  
  cartItems: [] 
};

const cartItemsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ADD_ITEM_TO_CART :
      return {
        ...state,
        cartItems:[...state.cartItems, action.item] 
      };
    default:
      return state;
  }
};

export default cartItemsReducer;