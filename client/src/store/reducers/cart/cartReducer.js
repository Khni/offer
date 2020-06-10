import {TOGGLE_CART, OPEN_SIDEBAR} from '../../types/cartTypes';

const INITIAL_STATE = {
  hidden: true, 
  hiddenSidebar: true
  
};

const cartReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case TOGGLE_CART :
      return {
        ...state,
        hidden: !state.hidden
      };
      
      case OPEN_SIDEBAR :
      return {
        ...state,
        hiddenSidebar: !state.hiddenSidebar
      };
    default:
      return state;
  }
};

export default cartReducer;