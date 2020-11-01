import { 
    
    SET_DEFAULT_ADDRESS, 
    FETCH_ADDRESSES,
    ADD_NEW_ADDRESS
 
  } from '../../types/authUserTypes';
  import * as actionTypes from '../../types';

  const DEFAULT_STATE = {
    
  
        favorites : {
list: [], 
Loading: false, 
error: '' 
}, 


        seen : {
list: [], 
Loading: false, 
error: '' 
}



    
       
       
    }
    
    export default (state = DEFAULT_STATE, action) => {
      switch(action.type) {
        case actionTypes.FRTCH_FAVORITES_START:
          return { ...state, favorites: {... state.favorites, Loading: true  } }
          case actionTypes.FRTCH_FAVORITES_SUCCESS:
          return { ...state, favorites: {... state.favorites, Loading: false, list: action.list, error:''} }
          case actionTypes.FRTCH_FAVORITES_ERROR:
          return { ...state, favorites: {... state.favorites, Loading: false, error: action.error} }
          
          
          case actionTypes.FRTCH_SEEN_START:
          return { ...state, seen: {... state.seen, Loading: true  } }
          case actionTypes.FRTCH_SEEN_SUCCESS:
          return { ...state, seen: {... state.seen, Loading: false, list: action.list, error:''} }
          case actionTypes.FRTCH_SEEN_ERROR:
          return { ...state, seen: {... state.seen, Loading: false, error: action.error} }
          
          
          
          
  
        default:
          return state
      }
    }