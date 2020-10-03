import React, { Component } from 'react';
import Navbar from '../navbar/navbar'
import DropdownMenu from '../../miniMenus/ChoicesMenuContainer/ChoicesMenuContainer' 
import NavItem from '../NavItem/NavItem'
import { ReactComponent as BoltIcon } from '../../icons/header/usernew.svg';
import { ReactComponent as CartIcon } from '../../icons/header/cart.svg';
import { ReactComponent as User } from '../../icons/header/usern.svg';
import { ReactComponent as Favorite } from '../../icons/header/favorite.svg';
import { ReactComponent as Orders } from '../../icons/header/orders.svg';
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
link: '/settings' 
}, 
{
icon:<Orders /> , 
title:'Orders', 
link: '/orders' 
}, 
{
icon:<Favorite /> , 
title:'Favorite', 
link: '/favorite-list' 
}, 
{
icon:<View /> , 
title:'View', 
link: '/viewed-items' 
}
] 
  
  return (
    <Navbar>

<div className="logo-corner-head">
<NavItem icon={<CartIcon />} link='/cart' />
</div>


<div className="user-corner-head">

{this.props.token ? 
<NavItem icon={<User />}  >

        <DropdownMenu dropDownItems={dropDownItems}></DropdownMenu>
    </NavItem> :   <NavItem link='/signup' icon={<User />} />} 

      <NavItem icon={<CartIcon />} link='/cart' />
      

</div>
    
    
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
    // hidden: cartHidden(state) ,
    // hiddenSidebar: sidebarHidden(state),
    // totalItems: selectCartItems(state).reduce((accumalatedQuantity, item) =>accumalatedQuantity + item.quantity , 0)


  };
}



export default connect(mapStateToProps)(Header);