import React, { Component } from 'react';
import Navbar from '../navbar/navbar'
import DropdownMenu from '../../miniMenus/ChoicesMenuContainer/ChoicesMenuContainer' 
import NavItem from '../NavItem/NavItem'
import { ReactComponent as BoltIcon } from '../../icons/header/usernew.svg';
import { ReactComponent as CartIcon } from '../../icons/header/cart.svg';
import { ReactComponent as User } from '../../icons/header/usern.svg';
import { ReactComponent as UserLogged } from '../../icons/header/userlogged.svg';
import { ReactComponent as Favorite } from '../../icons/header/favorite.svg';
import { ReactComponent as Orders } from '../../icons/header/orders.svg';
import { ReactComponent as View } from '../../icons/header/view.svg';
import { ReactComponent as Settings } from '../../icons/header/setting.svg';
import { ReactComponent as Menu } from '../../icons/header/menu.svg';
import {cartHidden, sidebarHidden, selectCartItems} from  '../../../store/reducers/cart/cartReselect';
import {selectTermsLang, selectLang}  from '../../../store/reducers/langReducer/langsReselect';
import * as actions from '../../../store/actions/cartAction.js'
import CartDropdown from '../../cart/cart-dropdown.component';
import Sidebar from '../../sidebar/sidebar.js'
import Backdrop from '../../sidebar/backdrop'
import BackDropMenu from '../../miniMenus/backdrop'
import Offerenologo from '../../header/img/juv.png';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import * as RouterDom from 'react-router-dom';
import Searchbox from '../../searchbox/searchbox.component'
import CartCounter from '../cartCounter'
import style from '../head.scss'
class Header extends Component {

  constructor(props) {
    super(props);
    this.counterClick = this.counterClick.bind(this)

  }

  counterClick (){
    this.props.history.push('/cart')
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

// let logoClass = "logo"
// if (this.props.Lang == 'ar') {
//   logoClass = "logo-ar"
// }


let navBarNav = 'navbar-nav'
let CounterCart = "CounterCart"
let logo = "logo"
let userCorner = "user-corner-head"
let logoCorner = "logo-corner-head"
let sideBar = "sidebar"

if (this.props.Lang == 'ar') {
  navBarNav = "navbar-navAr"
  CounterCart = "CounterCartAr"
  logo = "logo-ar"
   userCorner = "user-corner-headAr"
 logoCorner = "logo-corner-headAr"
 sideBar = "sidebarAr"
}
  return (
  
<Navbar navBarNav={navBarNav}>
< Backdrop show={this.props.hiddenSidebar}/>
<Sidebar class={sideBar} show={this.props.hiddenSidebar} />
<div className={logoCorner}>

<Link className="icon-button"  onClick={this.props.openSidebar}>
<Menu />
             
           </Link>

<Link className="icon-button-noBorder"  to='/'>
             <img className={logo} src={Offerenologo} />
           </Link>
</div>


<div className={userCorner}>

{this.props.token ? 
<NavItem icon={<UserLogged />}  >

   <DropdownMenu dropDownItems={dropDownItems}></DropdownMenu>
   < BackDropMenu/>
 </NavItem> :   <NavItem link='/authnav' icon={<User />} />} 

   <NavItem icon={<CartIcon />} link='/cart' />
   <CartCounter class={CounterCart} click={this.counterClick} total={this.props.totalItems}/>
  
</div>
 
 
 </Navbar>

  );
 } 
}

function mapStateToProps(state) {
  return {
    Lang : selectLang(state),
    isAuth: state.userAuth.authUser.isAuthenticated,
    errorMsg: state.userAuth.authUser.error,
    token: state.userAuth.authUser.token,
    name: state.userAuth.authUser.name,
    // hidden: cartHidden(state) ,
     hiddenSidebar: sidebarHidden(state),
     totalItems: selectCartItems(state).reduce((accumalatedQuantity, item) =>accumalatedQuantity + item.quantity , 0)
    // totalItems: selectCartItems(state).reduce((accumalatedQuantity, item) =>accumalatedQuantity + item.quantity , 0)


  };
}




export default withRouter(connect(
  mapStateToProps,actions
)(Header));