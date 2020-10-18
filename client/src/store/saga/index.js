import { takeEvery, all, takeLatest } from "redux-saga/effects";

import * as actionTypes from "../types/index";
import {
  logoutSaga,
  authUserSaga,
} from "./userSaga";

export function* watchAuth() {
  yield all([
    takeEvery(actionTypes.AUTH_INITIATE_LOGOUT, logoutSaga),
    takeEvery(actionTypes.AUTH_USER, authUserSaga),
  ]);
}
