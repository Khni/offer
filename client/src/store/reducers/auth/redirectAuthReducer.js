import { 
  CHECKOUT_LINK_ADD, 
  CHECKOUT_LINK_REMOVE
  
} from '../../types';

const DEFAULT_STATE = {
    
     authLink: '' 
  }
  
  export default (state = DEFAULT_STATE, action) => {
    switch(action.type) {
      
          case CHECKOUT_LINK_ADD:
        return { ...state, authLink: '/cart'}
        
        case CHECKOUT_LINK_REMOVE:
        return { ...state, authLink: ''}


      default:
        return state
    }
  }