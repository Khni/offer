import {SHOW_HINTBOX, HIDE_HINTBOX, 
SHOW_ALARMWINDOW, 
HIDE_ALARMWINDOW
} from '../types';

//alarmWindow
export const showAlarmWindowAction=(btns, title) =>{
return dispatch =>{

 dispatch({
        type: SHOW_ALARMWINDOW, 
        btns, 
        title
      });
      
     
      
     } 
}

export const hideAlarmWindowAction=() =>{
return dispatch =>{

 dispatch({
        type: HIDE_ALARMWINDOW, 
       
      });
      
     
      
     } 
}


//hintBox
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