import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, combineReducers,  applyMiddleware} from 'redux';
import reduxThunk from 'redux-thunk';
import './index.scss';
import './models.scss';
//import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App';
import axios from 'axios';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter } from "react-router-dom";
import ScrollToTop from './config/scrollToTop.js';
import AuthCheck from './config/authCheck'

import { PersistGate } from 'redux-persist/integration/react';

import { store, persistor }from "./store/store" ;

axios.defaults.withCredentials = true;
const jwtToken = localStorage.getItem('JWT_TOKEN');
axios.defaults.headers.common['Authorization'] = jwtToken;
 

//const store = createStore(Reducers , {}, applyMiddleware(reduxThunk));
ReactDOM.render(
  <BrowserRouter>
  
<Provider store={store}>
<PersistGate persistor={persistor}>

<ScrollToTop>

<App />

</ScrollToTop>

</PersistGate>
</Provider>

  </BrowserRouter>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
