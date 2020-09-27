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
import ProductPage from './components/productPage/productPage'
import AdminPage from './admin/admin'
import AdminAuthHOC from './admin/components/HOCs/auth/authHOC'
import AdminLogin from './admin/components/auth/sign-in/signIn'
import UserAccount from './components/UserAccount/account.page.js'
import AddAddress from './components/UserAccount/components/userPages/AccountSettings/AddAddressForm/AddAddressForm'

function App() {
  return (
    <div className="App">
   
    
     <Switch>
   
          <Route exact path='/' component={HomeMenu} />
          <Route path='/signup' component={authHOC(SignUp) } />
         <Route path='/signin' component={authHOC(SignIn)} />
         <Route path='/cart' component={Cart} />
         <Route path='/account' component={UserAccount} />
          <Route path='/item/:id' component={ProductPage} />
          <Route path='/addaddress' component={AddAddress} />
          <Route path='/admin' component={AdminAuthHOC(AdminPage)} />
          <Route path='/admin-login' component={AdminLogin} />
          
      
        </Switch>
    </div>
  );
}

export default App;