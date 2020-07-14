import { 
  AUTH_SIGN_UP, 
  AUTH_SIGN_OUT, 
  AUTH_SIGN_IN, 
  AUTH_ERROR } from '../../../types/authAdminTypes';

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
      case AUTH_SIGN_UP:
        return { ...state, authAdmin: {...authAdmin, isAuthenticated: true, token:action.token, error: ''} }
      case AUTH_SIGN_IN:
        return { ...state, authAdmin:{...authAdmin,isAuthenticated: true, token:action.token, Email:action.Email,  Name:action.Name ,error: ''}  }
      case AUTH_SIGN_OUT:
        return { ...state, isAuthenticated: false, token:'', error: '', Email:'', Name:'' }
      case AUTH_ERROR:
        return { ...state, error: action.payload }
      default:
        return state
    }
  }