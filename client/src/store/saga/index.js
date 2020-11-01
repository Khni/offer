import { takeEvery, all, takeLatest } from "redux-saga/effects";

import * as actionTypes from "../types/index";
import {
  logoutSaga,
  authUserSaga,
} from "./userSaga";
import {
  favoriteListSaga,
  seenListSaga,
} from "./favouritesAndSeenSaga";

export function* watchAuth() {
  yield all([
    takeEvery(actionTypes.AUTH_INITIATE_LOGOUT, logoutSaga),
    takeEvery(actionTypes.AUTH_USER, authUserSaga),
    takeEvery(actionTypes.FAVORITE_LIST_ACTION, favoriteListSaga),
    takeEvery(actionTypes.SEEN_LIST_ACTION, seenListSaga),
  ]);
}
