import React from 'react';
import logo from './logo.svg';
import './App.css';
import {Component} from 'react';
import Header from './components/header/header.js'
import HomeMenu from './components/home-menu/homeMenu.js'
import { Switch, Route } from 'react-router-dom';
import SignUp from './components/authNew/sign-up/signUp.js';
import SignIn from './components/authNew/sign-in/signIn.js';
import authHOC from './components/HOCs/auth/authHOC.js';
import Cart from './components/cart/cart.component.js';

function App() {
  return (
    <div className="App">
   
    
     <Switch>
   
          <Route exact path='/' component={HomeMenu} />
          <Route path='/signup' component={authHOC(SignUp) } />
         <Route path='/signin' component={authHOC(SignIn)} />
           <Route path='/cart' component={Cart} />
                <Route path='/item/:title' component={SignIn} />
      
        </Switch>
    </div>
  );
}

export default App;