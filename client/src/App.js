import React from 'react';

import './App.css';

import HomeMenu from './components/home-menu/homeMenu.js'
import { Switch, Route } from 'react-router-dom';
import AuthNav from './components/authNew/authNavPage/authNavPage';
import SignUp from './components/authNew/sign-up/signUp.js';
import SignIn from './components/authNew/sign-in/signIn.js';

import authHOC from './components/HOCs/auth/authHOC.js';
import AccountHOC from './components/HOCs/auth/accountHOC.js';
import Cart from './components/cart/cart.component.js';
import ProductPage from './components/productPage/productPage'
import AdminPage from './admin/admin'
import AdminAuthHOC from './admin/components/HOCs/auth/authHOC'
import AdminLogin from './admin/components/auth/sign-in/signIn'
import UserAccount from './components/UserAccount/account.page.js'
import CheckoutAddress from './components/checkout/addresses/checkoutAddress'
import AddAddress from './components/UserAccount/components/userPages/AccountSettings/AddAddressForm/AddAddressForm'
import CheckoutPayment from './components/checkout/payment/checkoutPayment'
import AccountSettingsNav from './components/UserAccount/components/userPages/AccountSettings/AccountSettingsNav.js'
import Orders from './components/UserAccount/components/userPages/Orders/Orders.js'
//import AddProduct from './components/UserAccount/components/adminPage/products/addProduct.component'
import FavoriteList from './components/UserAccount/components/userPages/FavoriteList/FavoriteList.js'
import ViewedItems from './components/UserAccount/components/userPages/ViewedItems/ViewedItems.js'
import Carousel from './components/carousel'
import OrderPageAdmin from './admin/components/adminPage/orders/orderPage'
import ReviewsNavAdmin from './admin/components/adminPage/reviews/TopNav/reviewsNav'
import OrderUserPage from './components/UserAccount/components/userPages/Orders/orderPage'
function App() {
  return (
    <div className="App">


      <Switch>

        <Route exact path='/' component={HomeMenu} />
        <Route path='/signup' component={authHOC(SignUp)} />
        <Route path='/carousel' component={Carousel} />
        <Route path='/signin' component={authHOC(SignIn)} />
        <Route path='/cart' component={Cart} />
        <Route path='/account' component={AccountHOC(UserAccount)} />
        <Route path='/item/:id' component={ProductPage} />
        <Route path='/addaddress' component={AddAddress} />
        <Route path='/admin' component={AdminAuthHOC(AdminPage)} />
        <Route path='/admin-login' component={AdminLogin} />
        <Route path='/authnav' component={AuthNav} />

        <Route path='/admin-reviews' component={ReviewsNavAdmin} />
        <Route path='/checkout-address' component={AccountHOC(CheckoutAddress)} />
        <Route path='/checkout-confirm' component={AccountHOC(CheckoutPayment)} />
        <Route path="/settings" component={AccountHOC(AccountSettingsNav)} />
        <Route path="/orders" component={AccountHOC(Orders)} />
        <Route path="/orderpage-admin/:id" component={OrderPageAdmin} />
        <Route path="/favorite-list" component={AccountHOC(FavoriteList)} />
        <Route path="/viewed-items" component={AccountHOC(ViewedItems)} />
        <Route path="/orderpage-user/:id" component={AccountHOC(OrderUserPage)} />

      </Switch>
    </div>
  );
}

export default App;