import {CHECKOUT_ADDRESS_START, 
CHECKOUT_ADDRESS_FINISHED, 
CHECKOUT_PAYMENT_START,
CHECKOUT_PAYMENT_FINISHED, 
CHECKOUT_CONFIRMED_START, 
CHECKOUT_CONFIRMED_FINISHED, 
CHECKOUT_STARTED, 
CHECKOUT_FINISHED

} from '../../types/checkoutTypes';

const INITIAL_STATE = {
  checkoutAddress: false,  
  checkoutPayment: false, 
  checkoutConfirmed: false, 
  cart :[] 
  
};

const checkoutReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CHECKOUT_ADDRESS_START :
      return {
        ...state,
        checkoutAddress: true
      };
      
      case CHECKOUT_ADDRESS_FINISHED :
      return {
        ...state,
        checkoutAddress: false  
      };
      
      
      
      
      
      case CHECKOUT_PAYMENT_START :
      return {
        ...state,
        checkoutPayment: true
      };
      
      case CHECKOUT_PAYMENT_FINISHED :
      return {
        ...state,
        checkoutPayment: false 
      };
      
      
      
      
      
      case CHECKOUT_CONFIRMED_START :
      return {
        ...state,
        checkoutConfirmed: true
      };
      
      case CHECKOUT_CONFIRMED_FINISHED :
      return {
        ...state,
        checkoutConfirmed: false
      };
    default:
      return state;
  }
};

export default checkoutReducer;