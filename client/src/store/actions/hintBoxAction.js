import {
     SHOW_HINTBOX, HIDE_HINTBOX,
     SHOW_ALARMWINDOW,
     HIDE_ALARMWINDOW
} from '../types';

//alarmWindow
export const showAlarmWindowAction = (btns, title) => {
     console.log("show alarmvvv box action");
     return dispatch => {

          dispatch({
               type: SHOW_ALARMWINDOW,
               btns,
               title
          });



     }
}

export const hideAlarmWindowAction = () => {
     console.log("hide alarm window");
     return dispatch => {

          dispatch({
               type: HIDE_ALARMWINDOW,

          });



     }
}


//hintBox
export const toggleHintBox = (msg) => {
     return dispatch => {

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