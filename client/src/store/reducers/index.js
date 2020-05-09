import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import userReducer from './userReducer';
import adminReducer from './adminReducer';


const Reducers = combineReducers({
	form: formReducer,
    userAuth: userReducer,
    adminAuth: adminReducer
});

export default Reducers