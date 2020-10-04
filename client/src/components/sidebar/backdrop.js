import React from 'react'
import sidebarcss from './sidebar.css';
import MenuIcontText from '../miniMenus/MenuIconText/MenuIcontText'
import { ReactComponent as Favorite } from '../icons/header/favorite.svg';
import { ReactComponent as Orders } from '../icons/header/orders.svg';
import { ReactComponent as View } from '../icons/header/view.svg';
import { ReactComponent as Settings } from '../icons/header/setting.svg';
import { ReactComponent as User } from '../icons/header/usern.svg';
import { ReactComponent as Avatar } from '../icons/header/avatar.svg';
import * as actions from '../../store/actions/cartAction.js'
import NavItem from '../headd/NavItem/NavItem'

import {cartHidden, sidebarHidden, selectCartItems} from  '../../store/reducers/cart/cartReselect'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
const Sidebar = props =>{
let back = "back" ;
  if (!props.show) {
    back = "back open" ;
} 
return (

   <div className={back} onClick={props.openSidebar}  >
    
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