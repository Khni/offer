import {SET_ARABIC, SET_ENGLISH} from '../../types/langTypes';
import { auth_ar, auth_en } from './languages';



const INITIAL_STATE = {
  lang: 'ar', 
  auth: auth_ar
};

const langReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_ARABIC :
      return {
     ...state,
        lang: 'ar', 
        auth: auth_ar
      };
      case SET_ENGLISH :
      return {
     ...state,
        lang: 'en', 
        auth: auth_en
      };
    default:
      return state;
  }
};

export default langReducer;