import { 
  AUTH_SIGN_UP, 
  AUTH_SIGN_OUT, 
  AUTH_SIGN_IN, 
  AUTH_ERROR, 
UPDATE_USER, 
  UPDATE_USER_ERROR, 
  
} from '../../types/authUserTypes';

import * as actionTypes from '../../types';

 
const DEFAULT_STATE = {
    authUser :{
    isAuthenticated: false,
    error: '',
    token:'', 
    email:'', 
    name:'', 
    id:'', 
    updated:false, 
    Loading: false
   }
   
   
  }
  
  export default (state = DEFAULT_STATE, action) => {
    switch(action.type) {
      case AUTH_SIGN_UP:
        return { ...state, authUser: {...state.authUser,isAuthenticated: true, token:action.token, email:action.email,  name:action.name , id: action.id, error:''} }
      case AUTH_SIGN_IN:
        return { ...state, authUser:{...state.authUser,isAuthenticated: true, token:action.token, email:action.email,  name:action.name , id: action.id, error:''}  }
        
        case UPDATE_USER:
        return { ...state, authUser:{...state.authUser,isAuthenticated: true, email:action.email,  name:action.name ,id: action.id, error:'', updated:true}  }
        
        case UPDATE_USER_ERROR:
        return { ...state, authUser:{...state.authUser, updated:false}  }
        
      case AUTH_SIGN_OUT:
        return { ...state,authUser:{...state.authUser, isAuthenticated: false, token:'', error: '', email:'', name:'', id:'' },
        addresses:{...state.addresses, list: [], default:''}
      }
      case AUTH_ERROR:
        return { ...state, authUser:{error: action.payload}}
        
        
        
        
        
        
        case actionTypes.AUTH_START:
        return { ...state, authUser: {...state.authUser, Loading: true} }
      
      case actionTypes.AUTH_SUCCESS:
        return { ...state, authUser: {...state.authUser,isAuthenticated: true, token:action.token, email:action.email,  name:action.name , id: action.id, error:''} }
      
      case actionTypes.AUTH_FAIL:
        return { ...state, authUser:{...state.authUser, error: action.error}}
        case AUTH_LOGOUT:
        return { ...state,authUser:{...state.authUser, isAuthenticated: false, token:'', error: '', email:'', name:'', id:'' }}
      }
        
        
      default:
        return state
    }
  }