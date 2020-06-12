import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import userReducer from './userReducer';
import adminReducer from './adminReducer';
import dashboardReducer from './dashboardReducer';
import cartReducer from './cart/cartReducer';
import langReducer from './langReducer/langReducer';
import cartItemsReducer from './cart/cartItemsReducer';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['dashboard' ]
};

const Reducers = combineReducers({
	form: formReducer,
    userAuth: userReducer,
    adminAuth: adminReducer, 
    dashboard: dashboardReducer,
    cartReducer: cartReducer, 
    cartItemsReducer: cartItemsReducer, 
    langReducer: langReducer
});

export default persistReducer(persistConfig, Reducers) 