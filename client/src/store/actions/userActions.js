import * as actionTypes from "../types";

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START
  };
};

export const authSuccess = (token, refreshToken, userId, name, email, phone) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    refreshToken: refreshToken,
    token: token,
    email: email,
    name: name,
    id: userId,
    phone: phone
  };
};


export const refreshToken = (token , refreshToken) => {
  return {
    type: actionTypes.REFRESH_TOKEN,
    refreshToken: refreshToken,
    token: token
  };
};



export const authFail = error => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error
  };
};
export const authLeft = () => {
  return {
    type: actionTypes.AUTH_USER_LEFT
  };
};

export const updateLeft = () => {
  return {
    type: actionTypes.UPDATE_USER_LEFT
  };
};


export const updateUserFail = error => {
  return {
    type: actionTypes.UPDATE_USER_FAIL,
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
export const updateUser = (data, action, token) => {
  return {
    type: actionTypes.AUTH_USER,
    data: data,
    action: action,
    token: token
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

