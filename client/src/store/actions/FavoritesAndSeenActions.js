import * as actionTypes from "../types";
import * as APIs from './APIs'
import axios from "axios"
import * as calls from './axiosCalls'

export const fetchFavorites = (token) =>{
	return async dispatch => {
	
  dispatch({
         type: actionTypes.FRTCH_FAVORITES_START
      });
  let url = APIs.GET_USER_FAVORITES
  try {
    let response = await calls.getDataHeaderAuth(url,token) 
  
    dispatch({
         type: actionTypes.FRTCH_FAVORITES_SUCCESS, 
         list: response.data.favoriteProducts
      });
  } catch (error) {
    dispatch({
         type: actionTypes.FRTCH_FAVORITES_ERROR, 
         error: error.response.data.error
      });
  }
}
} 


export const fetchSeen= (token) => {
	return async dispatch => {
	
  dispatch({
         type: actionTypes.FRTCH_SEEN_START
      });
  let url = APIs.GET_USER_SEEN
  try {
    let response = await calls.getDataHeaderAuth(url,token) 
    
    dispatch({
         type: actionTypes.FRTCH_SEEN_SUCCESS, 
         list: response.data.ViewedProducts
      });
  } catch (error) {
    dispatch({
         type: actionTypes.FRTCH_SEEN_ERROR, 
         error: error.response.data.error
      });
  }
}
} 



export const fetchFavoritesStart = () => {
  return {
    type: actionTypes.FRTCH_FAVORITES_START
  };
};

export const fetchFavoritesSuccess = (list) => {
  return {
    type: actionTypes.FRTCH_FAVORITES_SUCCESS,
    list: list
  };
};

export const fetchFavoritesError = error => {
  return {
    type: actionTypes.FRTCH_FAVORITES_ERROR,
    error: error
  };
};


export const favoriteListAction = (token) => {
  return {
    type: actionTypes.FAVORITE_LIST_ACTION,
    token: token
    
  };
};
//seen

export const fetchSeenStart = () => {
  return {
    type: actionTypes.FRTCH_SEEN_START
  };
};

export const fetchSeenSuccess = (list) => {
  return {
    type: actionTypes.FRTCH_SEEN_SUCCESS,
    list: list
  };
};

export const fetchSeenError = error => {
  return {
    type: actionTypes.FRTCH_SEEN_ERROR,
    error: error
  };
};


export const seenListAction = (token) => {
  return {
    type: actionTypes.SEEN_LIST_ACTION,
    token: token
    
  };
};
