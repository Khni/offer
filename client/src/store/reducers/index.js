import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import userReducer from './auth/userReducer';
import addressReducer from './auth/addressReducer'
import adminReducer from './admin/auth/adminReducer';
import dashboardReducer from './auth/dashboardReducer';
import cartReducer from './cart/cartReducer';
import langReducer from './langReducer/langReducer';
import cartItemsReducer from './cart/cartItemsReducer';
import checkoutReducer from './checkout/checkoutReducer';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import ProductsReducer from './products/productsReducer';
import categoryReducer from './categories/categoryReducer'
import ordersReducer from './auth/ordersReducer.js';
import OrdersAdminReducer from './admin/orders/ordersReducer'

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['dashboard','adminAuth', 'cartItemsReducer', 'checkoutReducer']
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
    categoryReducer: categoryReducer, 
    checkoutReducer: checkoutReducer,
    ordersReducer: ordersReducer, 
    addressReducer: addressReducer,
    OrdersAdminReducer: OrdersAdminReducer
});

export default persistReducer(persistConfig, Reducers) 