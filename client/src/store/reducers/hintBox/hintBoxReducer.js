import {
  SHOW_HINTBOX, HIDE_HINTBOX,
  SHOW_ALARMWINDOW,
  HIDE_ALARMWINDOW

} from '../../types';

const INITIAL_STATE = {
  hidden: true,
  msg: '',
  alarmWindow: {
    show: false,
    title: '',
    btns: []
  }



};

const hintBoxReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case HIDE_HINTBOX:
      return {
        ...state,
        hidden: true,
        msg: ''
      };

    case SHOW_HINTBOX:
      return {
        ...state,
        hidden: false,
        msg: action.msg
      };

    case SHOW_ALARMWINDOW:
      return {
        ...state,
        alarmWindow: {
          show: true,
          title: action.title,
          btns: action.btns
        }
      };

    case HIDE_ALARMWINDOW:
      return {
        ...state,
        alarmWindow: {
          show: false,
          title: '',
          btns: []
        }
      };


    default:
      return state;
  }
};

export default hintBoxReducer;