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
      const response = await axios.post('http://localhost:8080/signup', data);
     console.log("signUp axios") 
      dispatch({
        type: AUTH_SIGN_UP, 
        token: response.token
      });
    //  localStorage.setItem('JWT_TOKEN', response.token);
   // axios.defaults.headers.common['Authorization'] = response.token;
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
   const response =   await axios.post('http://localhost:3000/8080/signin', data);

      dispatch({
        type: AUTH_SIGN_IN, 
        token: response.token
      });
      localStorage.setItem('JWT_TOKEN', response.token);
    axios.defaults.headers.common['Authorization'] = response.token;
    } catch(err) {
      dispatch({
        type: AUTH_ERROR,
        payload: err
      })
    }
  };
}


export const oauthGoogle = data => {
  return async dispatch => {
    const response = await axios.post('http://localhost:5000/users/oauth/google', {
      access_token: data
    });
 
    dispatch({
      type: AUTH_SIGN_UP,
      token: response.token
    });
 
    localStorage.setItem('JWT_TOKEN', response.token);
    axios.defaults.headers.common['Authorization'] = response.token;
  };
}
 
export const oauthFacebook = data => {
  return async dispatch => {
    const response = await axios.post('http://localhost:5000/users/oauth/facebook', {
      access_token: data
    });
 
    dispatch({
      type: AUTH_SIGN_UP,
      token: response.token
    });
 
    localStorage.setItem('JWT_TOKEN', response.token);
    axios.defaults.headers.common['Authorization'] = response.token;
  };
}