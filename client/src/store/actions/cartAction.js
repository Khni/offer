import {TOGGLE_CART, OPEN_SIDEBAR} from '../types/cartTypes.js'


export const toggle =() =>{
return dispatch =>{

 dispatch({
        type: TOGGLE_CART
        
      });
     } 
}

export const openSidebar =() =>{
return dispatch =>{

 dispatch({
        type: OPEN_SIDEBAR
        
      });
     } 
} 