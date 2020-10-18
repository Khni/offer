import * as actions from '../actions/userActions'
import * as APIs from '../actions/APIs'
import axios from "axios"
import { put, call } from 'redux-saga/effects'


export function fetchUser(url, data) {
  console.log("data" + url);
  // `axios` function returns promise, you can use any ajax lib, which can
  // return promise, or wrap in promise ajax call
  return axios.post(url, data);
};
export function* authUserSaga(data, action) {
  console.log("data" + JSON.stringify(data.data));
  yield put(actions.authStart());
  console.log("auth saga started");
  let url = APIs.USER_POST_SIGNUP

  if (data.action == "login") {
    url = APIs.USER_POST_LOGIN

  }
  try {
    //   const response = yield axios.post(url, data)
    const response = yield call(fetchUser, url, data.data)
    console.log("response" + response);
    yield put(
      actions.authSuccess(response.data.token,
        response.data.user._id,
        response.data.user.name,
        response.data.user.local.email)
    );
    // yield put(actions.checkAuthTimeout(response.data.expiresIn));
  } catch (error) {
    console.log("error" + error);
    yield put(actions.authFail('error'));
  }
}


export function* logoutSaga(action) {
  yield put(actions.logoutSucceed());
}