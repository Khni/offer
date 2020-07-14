import axios from 'axios';
import { AUTH_SIGN_IN, AUTH_ERROR} from '../types/authAdminTypes'



export const signIn = data => {


    return async dispatch => {
      try {
     const response =   await axios.post('http://localhost:8080/admin/login', data);
  console.log("response" +response.data);
  
        dispatch({
          type: AUTH_SIGN_IN, 
          token: response.token
        });
       
      } catch(err) {
       console.log("err"+ err.response);
          
        dispatch({
          type: AUTH_ERROR,
          payload: err.response.data.error
        })
      }
    };
  }