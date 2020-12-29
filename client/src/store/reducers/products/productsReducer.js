// import {FETCH_PRODUCTS} from '../../types/productsTypes';
import SHOP_DATA from './items.js'

const INITIAL_STATE = {
  products: SHOP_DATA
};

const productsReducer = (state = INITIAL_STATE, action) => {
  /*switch (action.type) {
    case FETCH_PRODUCTS :
      return {
     ...state, 
     products: action.products
       
      };
      
    default:
      return state;
  }*/

  return state;
};

export default productsReducer;