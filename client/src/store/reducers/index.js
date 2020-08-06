import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import userReducer from './auth/userReducer';
import adminReducer from './admin/auth/adminReducer';
import dashboardReducer from './auth/dashboardReducer';
import cartReducer from './cart/cartReducer';
import langReducer from './langReducer/langReducer';
import cartItemsReducer from './cart/cartItemsReducer';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import ProductsReducer from './products/productsReducer';
import categoryReducer from './categories/categoryReducer'
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['dashboard','adminAuth']
};

const Reducers = combineReducers({
	form: formReducer,
    userAuth: userReducer,
    adminAuth: adminReducer, 
    dashboard: dashboardReducer,
    cartReducer: cartReducer, 
    cartItemsReducer: cartItemsReducer, 
    langReducer: langReducer, 
    ProductsReducer: ProductsReducer,
    categoryReducer: categoryReducer
});

export default persistReducer(persistConfig, Reducers) 