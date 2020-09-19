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
  UPDATE_USER, 
  UPDATE_USER_ERROR, 
  DASHBOARD_GET_DATA, 

  SET_DEFAULT_ADDRESS, 
  FETCH_ADDRESSES
} from '../types/authUserTypes'
 
 export const signUp =( data, lang) => {
 	
  return async dispatch => {
    try {
      const response = await axios.post('/api/signup', data);
     console.log(response.data) 
     console.log('data'+data.email + data.password +data.name)
      dispatch({
        type: AUTH_SIGN_UP, 
        token: response.data.token, 
        email: response.data.user.local.email,
        name: response.data.user.name, 
        id: response.data.user._id
      });
    //  localStorage.setItem('JWT_TOKEN', response.token);
   // axios.defaults.headers.common['Authorization'] = response.token;
    } catch(err) {
    	let error ='' 
    	if( lang == 'ar') {
        error =err.response.data.error_ar
           } else if ( lang == 'en'){
            error =err.response.data.error_en
             } 
    	console.error('err',error +'' +lang + err)
      dispatch({
        type: AUTH_ERROR,
        payload: error 
      })
    }
  };
}

export const signIn = data => {
  return async dispatch => {
    try {
   const response =   await axios.post('/api/login', data);

      dispatch({
        type: AUTH_SIGN_IN, 
        token: response.data.token, 
        email: response.data.user.local.email,
        name: response.data.user.name, 
        id: response.data.user._id
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







export const UpdateUser = (data, userID) => {
  return async dispatch => {
    try {
   const response =   await axios.post('/api/user/update/'+ userID, data);

      dispatch({
        type: UPDATE_USER, 
        
        email: response.data.user.local.email,
        name: response.data.user.name, 
        id: response.data.user._id
      });
      localStorage.setItem('JWT_TOKEN', response.token);
    axios.defaults.headers.common['Authorization'] = response.token;
    } catch(err) {
      dispatch({
        type: UPDATE_USER_ERROR,
        payload: err
      })
    }
  };
}


export const UserSignOut = () => {

 console.log("signOut from user");
    return  dispatch => {
     
        dispatch({
          type: AUTH_SIGN_OUT
         
        });
       
      
    };
  }
  
  export const FetchAddressesList = (AddressesArray) => {

 console.log("FetchAddressesList from user");
    return  dispatch => {
     
        dispatch({
          type: FETCH_ADDRESSES, 
          addresses: AddressesArray
         
        });
       
      
    };
  }
  
  
  export const setDefaultAddress = (address, addressesArray) => {

 console.log("FetchAddressesList from user");
 let addressesList =addressesArray
 const indexOfDefault = addressesList.findIndex(a => a.id ==address.id) 
 let cutOut = addressesList.splice(indexOfDefault, 1) [0]; // cut the element at index 'from'
    addressesList.splice(0, 0, cutOut);    
    
    return  dispatch => {
     
        dispatch({
          type: SET_DEFAULT_ADDRESS, 
          defaultAddress: address, 
          addresses: addressesList
         
        });
       
      
    };
  }
  
  
  
  
  


