import * as actions from '../actions'
import * as APIs from '../actions/APIs'

import * as calls from './axiosCalls.js'
import { put, call } from 'redux-saga/effects'


export function* authUserSaga(data) {
  console.log("data" + JSON.stringify(data.data));
  yield put(actions.authStart());
  console.log("auth saga started");
  let url = APIs.USER_POST_SIGNUP

  if (data.action === "login") {
    url = APIs.USER_POST_LOGIN

  }
  if (data.action === "updateuser") {
    url = APIs.USER_POST_UPDATE

  }
  if (data.action === 'goauth') {
    url = APIs.USER_POST_GOOGLE_OAUTH
  }

  if (data.action === 'fbauth') {
    url = APIs.USER_POST_FB_OAUTH
  }
  try {
    //   const response = yield axios.post(url, data)
    let response = ''
    if (data.action === "login" || data.action === "signup" || data.action === 'goauth'|| data.action === 'fbauth') {
      response = yield call(calls.postData, url, data.data)
    }

    if (data.action === "updateuser") {
      response = yield call(calls.postDataHeaderAuth, url, data.data, data.token)
    }
    console.log("phone action" + response.data.user.phone);

if (data.action === "login" || data.action === "signup" || data.action === 'updateuser') {
      yield put(
      actions.authSuccess(response.data.token,
        response.data.refreshToken,
        response.data.user._id,
        response.data.user.name,
        response.data.user.local.email,
        response.data.user.phone
      )
    );
    }
    
    if ( data.action === 'goauth') {
      console.log("token googleAuth" + response.data.token);
      yield put(
      actions.authSuccess(response.data.token,
        response.data.refreshToken,
        response.data.user._id,
        response.data.user.name,
        response.data.user.google.email,
        response.data.user.phone
      )
    );
    }
  /*  if ( data.action === 'fbauth') {
      console.log("token fBAuth" + response.data.token);
      yield put(
      actions.authSuccess(response.data.token,
        response.data.refreshToken,
        response.data.user._id,
        response.data.user.name,
        response.data.user.facebook.email,
        response.data.user.phone
      )
    );
    }*/




    
    // yield put(actions.checkAuthTimeout(response.data.expiresIn));
  } catch (error) {
    if (data.action === "updateuser") {
      return yield put(actions.updateUserFail(error.response.data.error_en));

    }

    yield put(actions.authFail(error.response.data.error_en));

  }
}


export function* logoutSaga(action) {
  yield put(actions.logoutSucceed());
}