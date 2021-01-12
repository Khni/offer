import {SHOW_HINTBOX, HIDE_HINTBOX} from '../../types';

const INITIAL_STATE = {
  hidden: true, 
  msg: '' 
  
  
};

const hintBoxReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case HIDE_HINTBOX :
      return {
        ...state,
        hidden: true, 
        msg: '' 
      };
      
      case SHOW_HINTBOX :
      return {
        ...state,
        hidden: false, 
        msg: action.msg
      };
      
    default:
      return state;
  }
};

export default hintBoxReducer;