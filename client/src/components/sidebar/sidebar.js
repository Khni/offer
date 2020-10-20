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
import { ReactComponent as Egypt } from '../icons/egypt.svg';
import { ReactComponent as Us } from '../icons/us.svg';
//import * as actions from '../../store/actions/cartAction.js'
import * as actions from '../../store/actions'
import { selectAuthLang, selectLang} from '../../store/reducers/langReducer/langReselect';
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
                  
                </Link> : <Link  to='/authnav'>
                
<h5>Login or Sign up here</h5>
                  
                </Link>}

  <MenuIcontText class="miniMenuItem-sidebar" leftIcon={<Settings />} link='/settings' click={props.openSidebar}>Settings</MenuIcontText>
  <MenuIcontText class="miniMenuItem-sidebar"  leftIcon={<Orders />} link='/orders' click={props.openSidebar}>Orders</MenuIcontText>
  <MenuIcontText class="miniMenuItem-sidebar"  leftIcon={<Favorite />} link='/orders' click={props.openSidebar}>Favorites</MenuIcontText>
  <MenuIcontText class="miniMenuItem-sidebar"  leftIcon={<View />} link='/orders' click={props.openSidebar}>View</MenuIcontText>
  {props.lang == 'ar' ? 
  <div>
<p> Languages </p>
<MenuIcontText class="miniMenuItem-sidebar"  leftIcon={<Us />}  click={props.setEnglish}>Set English</MenuIcontText>
</div> :

<div>
<p> اللغة </p>
<MenuIcontText class="miniMenuItem-sidebar"  leftIcon={<Egypt />} click={props.setArabic}> حول للعربية </MenuIcontText>
</div>
} 




  </div>
  </div>
 
  
)
} 

function mapStateToProps(state) {
  return {
  	lang: selectLang(state), 
    isAuth: state.userAuth.authUser.isAuthenticated,
    errorMsg: state.userAuth.authUser.error,
    token: state.userAuth.authUser.token,
    name: state.userAuth.authUser.name,
    // hidden: cartHidden(state) ,
     hiddenSidebar: sidebarHidden(state),
    // totalItems: selectCartItems(state).reduce((accumalatedQuantity, item) =>accumalatedQuantity + item.quantity , 0)


  };
}
const mapDispatchToProps = dispatch => {
    return {
        
        openSidebar: () => dispatch( actions.openSidebar()), 
      setEnglish: () =>{
return dispatch =>{
 dispatch( actions.setEnglish())
 dispatch( actions.openSidebar())
} 
} 
, 
      setArabic: () =>{
return dispatch =>{
 dispatch( actions.setArabic())
 dispatch( actions.openSidebar())
} 
} 
};

export default connect(mapStateToProps,actions)(Sidebar);