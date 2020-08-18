import axios from 'axios';
import { AUTH_SIGN_IN, AUTH_ERROR,AUTH_SIGN_UP,ADMIN_SIGN_OUT } from '../types/authAdminTypes'



export const signIn = data => {


    return async dispatch => {
      try {
     const response =   await axios.post('http://localhost:8080/admin/login', data);
  //console.log('response' +response.data.adminToLogin.email);
  
        dispatch({
          type: AUTH_SIGN_IN, 
          token: response.data.token,
          Email: response.data.adminToLogin.email,
          Name: response.data.adminToLogin.adminname
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
 


  export const signOut = () => {

 console.log("signOut from adminjs");
    return  dispatch => {
     
        dispatch({
          type: ADMIN_SIGN_OUT
         
        });
       
      
    };
  }
