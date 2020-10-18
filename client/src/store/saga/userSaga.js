import * as actions from '../actions/userActions'
import * as APIs from '../actions/APIs'
import axios from "axios"
import * as calls from './axiosCalls.js'
import { put, call } from 'redux-saga/effects'


export function* authUserSaga(data, action) {
  console.log("data" + JSON.stringify(data.data));
  yield put(actions.authStart());
  console.log("auth saga started");
  let url = APIs.USER_POST_SIGNUP

  if (data.action == "login") {
    url = APIs.USER_POST_LOGIN

  }
  if (data.action == "updateuser") {
    url = APIs.USER_POST_UPDATE

  }
  try {
    //   const response = yield axios.post(url, data)
     let response ='' 
  if (data.action == "login" ||data.action == "signup") {
    response = yield call(calls.postData, url, data.data)
  }
    
    if (data.action == "updateuser") {
    response = yield call(calls.postDataHeaderAuth, url, data.data, data.token)
  } 
 
    yield put(
      actions.authSuccess(response.data.token,
        response.data.user._id,
        response.data.user.name,
        response.data.user.local.email)
    );
    // yield put(actions.checkAuthTimeout(response.data.expiresIn));
  } catch (error) {
    if (data.action == "updateuser") {
    return yield put(actions.updateUserFail('error'));

  }
    yield put(actions.authFail('error'));
  }
}


export function* logoutSaga(action) {
  yield put(actions.logoutSucceed());
}