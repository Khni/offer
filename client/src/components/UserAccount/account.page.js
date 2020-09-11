import React, {Component} from 'react'
//import {selectAdminAuth} from  '../store/reducers/admin/auth/adminReselect';
import { Route, NavLink, Switch ,Redirect} from 'react-router-dom';
import AccountSettings from './components/userPages/AccountSettings/AccountSettings.js'
import Orders from'./components/userPages/Orders/Orders.js'
//import AddProduct from './components/adminPage/products/addProduct.component'
import FavoriteList from './components/userPages/FavoriteList/FavoriteList.js'
import ViewedItems from './components/userPages/ViewedItems/ViewedItems.js'
import { connect } from 'react-redux';
import * as actions from '../../store/actions/users.js'

import SideNavStyle from '../FixedSideMenuNav/FixedSideMenuNav.scss'
import SideNavComponent from '../FixedSideMenuNav/FixedSideMenuNav'
class  AccountUser extends Component {

    constructor(props) {
        super(props)
      // this.AdminSignOut = this.AdminSignOut.bind(this);
    }
signOutUser() {
const {UserSignOut} = this.props 
UserSignOut()
} 
          
          componentDidMount() {
     console.log('CDMount' );
    }

    componentDidUpdate() {
      console.log('CDUpdate' );
    }
          

    render() {
const navlinks = [{
  path: "/account/settings",
  title: "Settings"
},
{
  path: "/account/orders",
  title: "Orders"
},
{
  path: "/account/favorite-list",
  title: "Favorites"
},
{
  path: "/account/viewed-items",
  title: "Viewed"
}]

const buttons = [{
  title: "Sign Out",
  onClickFunc :this.signOutUser
}]


        return(
<div className="SideNavPage">


  <SideNavComponent navlinksArr={navlinks}
  title={this.props.name}
  btns={true} 
  buttons={buttons}
  />
    
    
  
    
    <div className="side-nav-container">
                <Switch>
                    <Route path="/account/settings" component={AccountSettings} />
                    <Route path="/account/orders" component={Orders}  />
                    <Route path="/account/favorite-list" component={FavoriteList} />
                    <Route path="/account/viewed-items" component={FavoriteList} />
                    
                </Switch>
               
    </div>
    
</div>


         
        )
    }
}

const mapStateToProps = state => {
  return {
    errorMsg: state.userAuth.authUser.error, 
    email: state.userAuth.authUser.email, 
    name: state.userAuth.authUser.name, 
    token: state.userAuth.authUser.token,
    isAuthenticated: state.userAuth.authUser.isAuthenticated
//state.adminAuth.error
    
  }

}

export default connect(mapStateToProps,actions)(AccountUser);
