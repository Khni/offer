import * as actions from '../actions'
import * as APIs from '../actions/APIs'
import axios from "axios"
import * as calls from './axiosCalls.js'
import { put, call } from 'redux-saga/effects'


export function* favoriteListSaga(token) {
  yield put(actions.fetchFavoritesStart());
  let url = APIs.GET_USER_FAVORITES
  try {
  let   response = yield call(calls.getDataHeaderAuth, url, token)
     yield put(
      actions.fetchFavoritesSuccess(response.data.favoriteProducts )
    );
  } catch (error) {
    yield put(actions.fetchFavoritesError(error.response.data.error));
  }
}

export function* seenListSaga(token) {
  yield put(actions.fetchSeenStart());
  let url = APIs.GET_USER_SEEN
  try {
  let   response = yield call(calls.getDataHeaderAuth, url, token)
     yield put(
      actions.fetchSeenSuccess(response.data.ViewedProducts )
    );
  } catch (error) {
    yield put(actions.fetchSeenError(error.response.data.error));
  }
}


