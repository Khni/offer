import {ADD_ITEM_TO_CART} from '../types/cartTypes';

export const AddItemToCart = item =>{
 return dispatch =>{
 	
 dispatch({
        type: ADD_ITEM_TO_CART, 
        item: item
      });
   
   
} 


 
}
export const addItem = item => ({
  type: ADD_ITEM_TO_CART,
  item: item
});
