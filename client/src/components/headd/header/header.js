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
import { ReactComponent as Menu } from '../../icons/header/menu.svg';
import {cartHidden, sidebarHidden, selectCartItems} from  '../../../store/reducers/cart/cartReselect';
import * as actions from '../../../store/actions/cartAction.js'
import CartDropdown from '../../cart/cart-dropdown.component';
import Sidebar from '../../sidebar/sidebar.js'
import Offerenologo from '../../header/img/juv.png';
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
<Sidebar show={this.props.hiddenSidebar} />
<div className="logo-corner-head">

<Link className="icon-button"  onClick={this.props.openSidebar}>
<Menu />
                
              </Link>

<Link className="icon-button-noBorder"  to='/'>
                <img className="logo" src={Offerenologo} />
              </Link>
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
     hiddenSidebar: sidebarHidden(state),
    // totalItems: selectCartItems(state).reduce((accumalatedQuantity, item) =>accumalatedQuantity + item.quantity , 0)


  };
}



export default connect(mapStateToProps,actions)(Header);