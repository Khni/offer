const DEFAULT_STATE = {
    authUser :{
    isAuthenticated: false,
    error: '',
    token:'', 
    email:'', 
    name:'' 
   } 
  }
  
  export default (state = DEFAULT_STATE, action) => {
    switch(action.type) {
      case AUTH_SIGN_UP:
        return { ...state, authUser: {...state.authAdmin,isAuthenticated: true, token:action.token, email:action.email,  name:action.name ,error:''} }
      case AUTH_SIGN_IN:
        return { ...state, authUser:{...state.authAdmin,isAuthenticated: true, token:action.token, email:action.email,  name:action.name ,error:''}  }
      case AUTH_SIGN_OUT:
        return { ...state,authUser:{...state.authAdmin, isAuthenticated: false, token:'', error: '', email:'', name:''} }
      case AUTH_ERROR:
        return { ...state, authUser:{error: action.payload}}
      default:
        return state
    }
  }