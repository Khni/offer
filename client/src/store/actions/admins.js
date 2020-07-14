import axios from 'axios';
import { AUTH_SIGN_IN, AUTH_ERROR} from '../types/authAdminTypes'



export const signIn = data => {


    return async dispatch => {
      try {
     const response =   await axios.post('http://localhost:8080/admin/login', data);
  console.log('response' +response.data.token);
  
        dispatch({
          type: AUTH_SIGN_IN, 
          token: response.data.token,
          Email: response.data.adminToLogin.Email,
          Name: response.data.adminToLogin.Name
        });
       
      } catch(err) {
      // console.log();
          console.error("err"+ err.response.data.error)
        dispatch({
          type: AUTH_ERROR,
          payload: err.response.data.error
        })
      }
    };
  }