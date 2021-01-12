import {SHOW_HINTBOX, HIDE_HINTBOX} from '../types';


export const toggleHintBox =(msg) =>{
return dispatch =>{

 dispatch({
        type: SHOW_HINTBOX, 
        msg
      });
      
      setTimeout(() =>
 dispatch({
        type: HIDE_HINTBOX
        
      })

, 2000);
      
     } 
}