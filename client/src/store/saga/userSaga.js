import * as actions from '../actions/userActions"
import * as APIs from '../actions/APIs'

export function* authUserSaga(data, action) {
  yield put(actions.authStart());
  
  let url =APIs.USER_POST_SIGNUP
    
  if (action == login) {
    url = APIs.USER_POST_LOGIN
    
  } 
  try {
    const response = yield axios.post(url, data);
    
        token: response.data.token, 
        email: response.data.user.local.email,
        name: response.data.user.name, 
        id: response.data.user._id
    
    yield put(
      actions.authSuccess(token, id, name, email)
    );
   // yield put(actions.checkAuthTimeout(response.data.expiresIn));
  } catch (error) {
    yield put(actions.authFail('error'));
  }
}


export function* logoutSaga(action) {
  yield put(actions.logoutSucceed());
}