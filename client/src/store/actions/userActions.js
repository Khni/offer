import * as actionTypes from "../types";

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START
  };
};

export const authSuccess = (token, userId, name, email) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    token: token, 
      email: email,
        name: name, 
        id: userId
  };
};

export const authFail = error => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error
  };
};


export const auth = (data, action) => {
  return {
    type: actionTypes.AUTH_USER,
    data: data,
    action: action
  };
};

export const logoutSucceed = () => {
  return {
    type: actionTypes.AUTH_LOGOUT
  };
};
export const logout = () => {

  return {
    type: actionTypes.AUTH_INITIATE_LOGOUT
  };
};

