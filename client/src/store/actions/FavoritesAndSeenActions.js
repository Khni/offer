import * as actionTypes from "../types";


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
