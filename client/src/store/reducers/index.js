import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import userReducer from './auth/userReducer';
import addressReducer from './auth/addressReducer'
import adminReducer from './admin/auth/adminReducer';
import dashboardReducer from './auth/dashboardReducer';
import cartReducer from './cart/cartReducer';
import langReducer from './langReducer/langReducer';
import langsReducer from './langReducer/langsReducer';
import cartItemsReducer from './cart/cartItemsReducer';
import checkoutReducer from './checkout/checkoutReducer';
import { persistReducer, createMigrate} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import ProductsReducer from './products/productsReducer';
import categoryReducer from './categories/categoryReducer'
import ordersReducer from './auth/ordersReducer.js';
import OrdersAdminReducer from './admin/orders/ordersReducer'
import {migrations} from './migrations.js' ;

const persistConfig = {
  key: 'root',
  //version: 0,
  storage,
  debug: true,
  //migrate: createMigrate(migrations, { debug: true }),
  whitelist: [
'dashboard'
,'adminAuth'
, 'cartItemsReducer'
, 'checkoutReducer'
, 'userAuth' 
,'langsReducer'
]
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
    OrdersAdminReducer: OrdersAdminReducer, 
    langsReducer : langsReducer
});

export default persistReducer(persistConfig, Reducers) 