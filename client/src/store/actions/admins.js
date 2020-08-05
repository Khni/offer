import axios from 'axios';
import { AUTH_SIGN_IN, AUTH_ERROR} from '../types/authAdminTypes'



export const signIn = data => {


    return async dispatch => {
      try {
     const response =   await axios.post('http://localhost:8080/admin/login', data);
  console.log('response' +response.data.adminToLogin.email);
  
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
 



export const fetchCategories = () => {


    return async dispatch => {
      try {
     const response =   await axios.get('http://localhost:8080/categories');
  console.log('response' +response.data.adminToLogin.email);
  
        dispatch({
          type: FETCH_CATEGORY, 
          Categories : response.data.categories,
          
        });
       
      } catch(err) {
      // console.log();
          console.error("err"+ err.response.data.error)
        dispatch({
          type: CATEGORY_FETCH_ERROR,
          payload: err.response.data.error
        })
      }
    };
  }
