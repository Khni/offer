import {SET_ARABIC, SET_ENGLISH} from '../../types/langTypes';
import { auth_ar, auth_en, cart_ar , cart_en, header_ar, header_en} from './languages';



const INITIAL_STATE = {
  lang: 'en', 
  auth: auth_ar, 
  header: header_en, 
  cart: cart_en
};

const langReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_ARABIC :
      return {
     ...state,
        lang: 'ar', 
        auth: auth_ar, 
        header: header_ar, 
        cart: cart_ar
      };
      case SET_ENGLISH :
      return {
     ...state,
        lang: 'en', 
        auth: auth_en, 
        header: header_en, 
         cart: cart_en
      };
    default:
      return state;
  }
};

export default langReducer;