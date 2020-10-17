import { 
    
    SET_DEFAULT_ADDRESS, 
    FETCH_ADDRESSES,
    ADD_NEW_ADDRESS
 
  } from '../../types/authUserTypes';
  
  const DEFAULT_STATE = {
    
  
        list:[], 
        default:'', 
        Loading: false, 
        error: '' 
    
       
       
    }
    
    export default (state = DEFAULT_STATE, action) => {
      switch(action.type) {
        
          case FETCH_ADDRESSES:
          return { ...state, list: action.addresses, default: action.defaultAddress}
          case SET_DEFAULT_ADDRESS:
          return { ...state,  list: action.addresses, default: action.defaultAddress}
          case ADD_NEW_ADDRESS:
            return { ...state, list: action.addresses, default: action.defaultAddress}
            
          
  
        default:
          return state
      }
    }