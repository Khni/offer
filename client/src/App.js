import React from 'react';
import logo from './logo.svg';
import './App.css';
import {Component} from 'react';
import Header from './components/header/header.js'
import HomeMenu from './components/home-menu/homeMenu.js'
import { Switch, Route } from 'react-router-dom';
import SignUp from './components/auth/sign-up/signUp.js';
import SignIn from './components/auth/sign-in/signIn.js';
import Cart from './components/cart/cart.component.js';

function App() {
  return (
    <div className="App">
     <Header />
    
     <Switch>
          <Route exact path='/' component={HomeMenu} />
          <Route path='/signup' component={SignUp} />
         <Route path='/signin' component={SignIn} />
           <Route path='/cart' component={Cart} />
      
        </Switch>
    </div>
  );
}

export default App;