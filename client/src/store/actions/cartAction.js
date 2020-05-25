import {TOGGLE_CART} from '../types/cartTypes.js'


export const toggle =() =>{
return dispatch =>{

 dispatch({
        type: TOGGLE_CART
        
      });
     } 
} 