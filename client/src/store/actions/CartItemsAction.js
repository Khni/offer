import {ADD_ITEM_TO_CART, REMOVE_ITEM_FROM_CART} from '../types/cartTypes';
import { addItemToCart, removeItemFromCart } from './cart.utils';


/*export const AddItemToCart =  (item, items)  =>{
 return dispatch =>{
 	
 dispatch({
        type: ADD_ITEM_TO_CART, 
        item: item, 
        items: items
      });
   
   
} 


 
}*/

export const addItem = (item, items) => ({
  type: ADD_ITEM_TO_CART,
  item: item, 
  items: addItemToCart(items, item)
});



export const addItemToCartItem = (item, items) => {

 const updatedItems= addItemToCart(items, item)
    return  dispatch => {
     
        dispatch({
          type: ADD_ITEM_TO_CART, 
          items : updatedItems
         
        });
       
      
    };
  }
  
  
  
  export const removeItemFromCartItem = (item, items) => {

 const updatedItems= removeItemFromCart(items, item)
    return  dispatch => {
     
        dispatch({
          type: REMOVE_ITEM_FROM_CART, 
          items : updatedItems
         
        });
       
      
    };
  }
  

export const removeItem = (item, items)  => ({
  type: REMOVE_ITEM_FROM_CART,
  item: item
});
