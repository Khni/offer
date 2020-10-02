import React, { useState } from 'react';
import Navbar from '../navbar/navbar'
import DropdownMenu from '../../miniMenus/ChoicesMenuContainer/ChoicesMenuContainer' 
import NavItem from '../NavItem/NavItem'
import { ReactComponent as BoltIcon } from '../../icons/header/usernew.svg';
import { ReactComponent as CartIcon } from '../../icons/header/cart.svg';
import { ReactComponent as User } from '../../icons/header/user.svg';
import { ReactComponent as Favorite } from '../../icons/header/favorite.svg';
import { ReactComponent as Orders } from '../../icons/header/gorders.svg';
import { ReactComponent as View } from '../../icons/header/view.svg';
import { ReactComponent as Settings } from '../../icons/header/setting.svg';

import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class Header extends Component {

  constructor(props) {
    super(props);

  }
  render() {
  const dropDownItems =[
{
icon:<Settings /> , 
title:'Settings', 
link: '/account/settings' 
}, 
{
icon:<Orders /> , 
title:'Orders', 
link: '/account/orders' 
}, 
{
icon:<Favorite /> , 
title:'Favorite', 
link: '/account/favorite-list' 
}, 
{
icon:<View /> , 
title:'View', 
link: '/account/viewed-items' 
}
] 
  
  return (
    <Navbar>
    {props.token ? 
<NavItem icon={<User />}  >
        <DropdownMenu dropDownItems={this.props.dropDownItems}></DropdownMenu>
    </NavItem> :   <NavItem link='/signup' icon={<User />} } 

      <NavItem icon={<CartIcon />} link='/cart' />
      

    
    </Navbar>
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



export default connect(mapStateToProps)(Header);