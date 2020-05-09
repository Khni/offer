import axios from 'axios';
import { 
  AUTH_SIGN_UP, 
  AUTH_SIGN_OUT, 
  AUTH_SIGN_IN,
  AUTH_LINK_GOOGLE, 
  AUTH_LINK_FACEBOOK,
  AUTH_UNLINK_GOOGLE,
  AUTH_UNLINK_FACEBOOK, 
  AUTH_ERROR,
  DASHBOARD_GET_DATA } from '../types/authUserTypes'
 
 export const signUp = data => {
  return async dispatch => {
    try {
      const response = await axios.post('http://localhost:3000/admin/signup', data);

      dispatch({
        type: AUTH_SIGN_UP
      });
    } catch(err) {
      dispatch({
        type: AUTH_ERROR,
        payload: err
      })
    }
  };
}

export const signIn = data => {
  return async dispatch => {
    try {
      await axios.post('http://localhost:3000/admin/signin', data);

      dispatch({
        type: AUTH_SIGN_IN
      });
    } catch(err) {
      dispatch({
        type: AUTH_ERROR,
        payload: 'Email and password combination isn\'t valid'
      })
    }
  };
}