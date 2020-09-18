import { 
  AUTH_SIGN_UP, 
  AUTH_SIGN_OUT, 
  AUTH_SIGN_IN, 
  AUTH_ERROR, 
UPDATE_USER, 
  UPDATE_USER_ERROR, 
  
  SET_DEFAULT_ADDRESS, 
  FETCH_ADDRESSES
} from '../../types/authUserTypes';

const DEFAULT_STATE = {
    authUser :{
    isAuthenticated: false,
    error: '',
    token:'', 
    email:'', 
    name:'', 
    id:'', 
    updated:false
   }, 
   
   addresses:{
      list:[], 
      default:'' 
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
        return { ...state,authUser:{...state.authUser, isAuthenticated: false, token:'', error: '', email:'', name:'', id:'' } }
      case AUTH_ERROR:
        return { ...state, authUser:{error: action.payload}}
        
        case FETCH_ADDRESSES:
        return { ...state, addresses:{...state.addresses, list: action.addresses}}
        case SET_DEFAULT_ADDRESS:
        return { ...state, addresses:{...state.addresses, default: action.defaultAddress}}
      default:
        return state
    }
  }