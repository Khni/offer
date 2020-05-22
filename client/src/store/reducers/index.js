import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import userReducer from './userReducer';
import adminReducer from './adminReducer';
import dashboardReducer from './dashboardReducer';


const Reducers = combineReducers({
	form: formReducer,
    userAuth: userReducer,
    adminAuth: adminReducer, 
    dashboard: dashboardReducer
});

export default Reducers