import {SET_ARABIC, SET_ENGLISH} from '../../types';
import { terms_ar, terms_en} from './terms';



const INITIAL_STATE = {
  lang: 'en', 
  terms: terms_en
};

const langReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_ARABIC :
      return {
     ...state,
        lang: 'ar', 
        terms: terms_ar
      };
      case SET_ENGLISH :
      return {
     ...state,
        lang: 'en', 
        terms: terms_en
      };
    default:
      return state;
  }
};

export default langReducer;