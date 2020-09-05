import { 
  ADMIN_SIGN_UP, 
  ADMIN_SIGN_OUT, 
  ADMIN_SIGN_IN, 
  ADMIN_AUTH_ERROR } from '../../../types/authAdminTypes';

  const DEFAULT_STATE = {
    authAdmin :{
    isAuthenticated: false,
    error: '',
    token:'', 
    Email:'', 
    Name:'' 
   } 
  }
  
  export default (state = DEFAULT_STATE, action) => {
    switch(action.type) {
      case ADMIN_SIGN_UP:
        return { ...state, authAdmin: {...state.authAdmin, isAuthenticated: true, token:action.token, error: ''} }
      case ADMIN_SIGN_IN:
        return { ...state, authAdmin:{...state.authAdmin,isAuthenticated: true, token:action.token, Email:action.Email,  Name:action.Name ,error:''}  }
      case ADMIN_SIGN_OUT:
        return { ...state,authAdmin:{...state.authAdmin, isAuthenticated: false, token:'', error: '', Email:'', Name:''} }
      case ADMIN_AUTH_ERROR:
        return { ...state, authAdmin:{error: action.payload}}
      default:
        return state
    }
  }