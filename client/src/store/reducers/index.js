import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import userReducer from './userReducer';
import adminReducer from './adminReducer';
import dashboardReducer from './dashboardReducer';
import cartReducer from './cartReducer';

import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['userAuth', 'userAuth', 'dashboard']
};

const Reducers = combineReducers({
	form: formReducer,
    userAuth: userReducer,
    adminAuth: adminReducer, 
    dashboard: dashboardReducer,
    cartReducer: cartReducer
});

export default persistReducer(persistConfig, Reducers) 