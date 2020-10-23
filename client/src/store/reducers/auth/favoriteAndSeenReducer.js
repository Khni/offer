import { 
    
    SET_DEFAULT_ADDRESS, 
    FETCH_ADDRESSES,
    ADD_NEW_ADDRESS
 
  } from '../../types/authUserTypes';
  
  const DEFAULT_STATE = {
    
  
        favlist:[], 
       
        seenlist:[], 
    
       
       
    }
    
    export default (state = DEFAULT_STATE, action) => {
      switch(action.type) {
        
          case FETCH_FAVORITE:
          return { ...state, list: action.favorites}
          case TOGGLE_FAVORITE:
          return { ...state, list: action.favorites}
          case FETCH_SEEN:
          return { ...state, list: action.seen}
            
          
  
        default:
          return state
      }
    }