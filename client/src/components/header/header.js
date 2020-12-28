import React, { Component } from 'react';
import  './header.scss';
import Offerenologo from './img/juv.png';
import menuicon from './img/menu.png';
import iconuser from './img/newuser.png';
import carticon from './img/newcart.png';
import closeCart from './img/close.png';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/cartAction.js';
import CartDropdown from '../cart/cart-dropdown.component';
import Sidebar from '../sidebar/sidebar.js'
import Searchbox from '../searchbox/searchbox.component'
import {cartHidden, sidebarHidden, selectCartItems} from  '../../store/reducers/cart/cartReselect';

class Header extends Component {

  // constructor(props) {
  //   super(props);

  // }
  render() {

    return (
      <div className="header-container">
         
        <Sidebar show={this.props.hiddenSidebar} />



        <div className="header">
        
          <div className="logo-Container">

          
            <div className="logo-container-left">

              <img alt="menu" src={menuicon} className="menuicon" onClick={this.props.openSidebar} />


              <Link to='/'>
                <img alt="JUVNI" className="logo" src={Offerenologo} />
              </Link>
              
            </div>{/*logo cont left*/}
            <div class="logo-container-right">
           
              {!this.props.isAuth ?
                <Link className="icontext margin-right10" to='/signin'>
                  <p className="signin-text icontext-text">signin</p>
                  <img src={iconuser} className="icontext-icon" />
                </Link> : null}

              {this.props.isAuth && this.props.token && !this.props.errorMsg?
                <Link className="icontext margin-right10" to='/account'>
                
<p className="signin-text icontext-text">  Welcome, <br />
 {this.props.name} </p>
                  <img alt="user" src={iconuser} className="icontext-icon" />
                </Link> : null}


                <p className="cartCounter"onClick={this.props.toggle}  >{this.props.totalItems}</p>
                
              <div className="cartSection" onClick={this.props.toggle}>
              
                {this.props.hidden ? <div className="cart-Section" > 
                
                  <img alt="cart" src={carticon} className="icontext-icon-cart" /></div>
                  : <img alt="close cart" src={closeCart} className="icontext-icon-cart" />}



              </div>
              

            </div>

        
          
          </div>
          <CartDropdown show={this.props.hidden} />
          {/*this.props.hidden ? null : <CartDropdown />*/}
          {this.props.searchbox ?  <Searchbox /> : null}
         

        </div>
       
      </div>
    );
  }

}


function mapStateToProps(state) {
  return {
    isAuth: state.userAuth.authUser.isAuthenticated,
    errorMsg: state.userAuth.authUser.error,
    token: state.userAuth.authUser.token,
    name: state.userAuth.authUser.name,
    hidden: cartHidden(state) ,
    hiddenSidebar: sidebarHidden(state),
    totalItems: selectCartItems(state).reduce((accumalatedQuantity, item) =>accumalatedQuantity + item.quantity , 0)


  };
}

export default connect(mapStateToProps, actions)(Header);
