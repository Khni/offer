import { 
  AUTH_SIGN_UP, 
  AUTH_SIGN_OUT, 
  AUTH_SIGN_IN, 
  AUTH_ERROR } from '../../types/authAdminTypes';

const DEFAULT_STATE = {
  isAuthenticated: false,
  Token:'', 
  error: ''
}

export default (state = DEFAULT_STATE, action) => {
  switch(action.type) {
    case AUTH_SIGN_UP:
      return { ...state, isAuthenticated: true, error: '', Token: action.Token}
    case AUTH_SIGN_IN:
      return { ...state, isAuthenticated: true, error: '', Token: action.Token}
    case AUTH_SIGN_OUT:
      return { ...state, isAuthenticated: false, error: '',Token:'' }
    case AUTH_ERROR:
      return { ...state, error: action.payload,Token:'', isAuthenticated: false}
    default:
      return state
  }
}