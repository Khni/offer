import React from 'react'
import sidebarcss from './sidebar.css';
import MenuIcontText from '../miniMenus/MenuIconText/MenuIcontText'
import { ReactComponent as Favorite } from '../icons/header/favorite.svg';
import { ReactComponent as Orders } from '../icons/header/orders.svg';
import { ReactComponent as View } from '../icons/header/view.svg';
import { ReactComponent as Settings } from '../icons/header/setting.svg';
import { ReactComponent as Close } from '../icons/close.svg';
import { ReactComponent as User } from '../icons/header/usern.svg';
import { ReactComponent as Avatar } from '../icons/header/avatar.svg';
import { ReactComponent as UserLogged } from '../icons/header/userlogged.svg';
import * as actions from '../../store/actions/cartAction.js'
import NavItem from '../headd/NavItem/NavItem'

import {cartHidden, sidebarHidden, selectCartItems} from  '../../store/reducers/cart/cartReselect'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
const Sidebar = props =>{
let sidebar = "sidebar" ;
  if (!props.show) {
sidebar = "sidebar open" ;
} 
return (

   <div className={sidebar} >
    
  <div>
<div className="icon-s svg-darkbg centerdiv"  onClick={props.openSidebar}><Close /></div>
  {/* <Link className="avatar-sidebar" to='/signup' >
 <UserLogged />
 </Link> */}
 
 
  {props.isAuth && props.token && !props.errorMsg?
                <Link  to='/settings'>
                
<h5>Welcome  , 
 {props.name}</h5>
                  
                </Link> : <Link  to='/signup'>
                
<h5>Login or Sign up here</h5>
                  
                </Link>}

  <MenuIcontText class="miniMenuItem-sidebar" leftIcon={<Settings />} link='/settings' click={props.openSidebar}>Settings</MenuIcontText>
  <MenuIcontText class="miniMenuItem-sidebar"  leftIcon={<Orders />} link='/orders' click={props.openSidebar}>Orders</MenuIcontText>
  <MenuIcontText class="miniMenuItem-sidebar"  leftIcon={<Favorite />} link='/orders' click={props.openSidebar}>Favorites</MenuIcontText>
  <MenuIcontText class="miniMenuItem-sidebar"  leftIcon={<View />} link='/orders' click={props.openSidebar}>View</MenuIcontText>



  </div>
  </div>
 
  
)
} 

function mapStateToProps(state) {
  return {
    isAuth: state.userAuth.authUser.isAuthenticated,
    errorMsg: state.userAuth.authUser.error,
    token: state.userAuth.authUser.token,
    name: state.userAuth.authUser.name,
    // hidden: cartHidden(state) ,
     hiddenSidebar: sidebarHidden(state),
    // totalItems: selectCartItems(state).reduce((accumalatedQuantity, item) =>accumalatedQuantity + item.quantity , 0)


  };
}


export default connect(mapStateToProps,actions)(Sidebar);