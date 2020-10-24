import {SET_ARABIC, SET_ENGLISH, SET_ENGLISH_BROWSER, SET_ARABIC_BROWSER} from '../../types';
import { terms_ar, terms_en} from './terms';



const INITIAL_STATE = {
  lang: 'en', 
  terms: terms_en, 
  set: false
};

const langReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_ARABIC :
      return {
     ...state,
        lang: 'ar', 
        set: true, 
        terms: terms_ar
      };
      case SET_ENGLISH :
      return {
     ...state,
        lang: 'en', 
        set: true, 
        terms: terms_en
      };
      
      
      case SET_ARABIC_BROWSER :
      return {
     ...state,
        lang: 'ar', 
        terms: terms_ar
      };
      case SET_ENGLISH_BROWSER :
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