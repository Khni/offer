import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, combineReducers,  applyMiddleware} from 'redux';
import reduxThunk from 'redux-thunk';
import './index.css';
import App from './App';
import axios from 'axios';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter } from "react-router-dom";
import userReducer from "./store/reducers/userReducer" ;
import adminReducer from "./store/reducers/adminReducer" ;
//import index file in reducers
import Reducers from "./store/reducers" ;
axios.defaults.withCredentials = true;


const store = createStore(Reducers , {}, applyMiddleware(reduxThunk));
ReactDOM.render(
  <BrowserRouter>
<Provider store={store}>
<App />
</Provider>
  </BrowserRouter>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
