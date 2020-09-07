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
 /*   AdminSignOut() {
  console.log('SignOut');
  console.log('AdminSignOut adminAuth'+this.props.AdminAuth.isAuthenticated+ this.props.AdminAuth.token);
        const {signOut} = this.props

           signOut()
           console.log('after AdminSignOut adminAuth'+this.props.AdminAuth.isAuthenticated+ this.props.AdminAuth.token);
         
          
          }*/
          
          componentDidMount() {
     console.log('CDMount AdminAuth'+ this.props.AdminAuth.isAuthenticated+ this.props.AdminAuth.token);
    }

    componentDidUpdate() {
      console.log('CDUpdate adminAuth'+this.props.AdminAuth.isAuthenticated+ this.props.AdminAuth.token);
    }
          

    render() {
const navlinks = [{
  path: "/account/settings",
  title: "Account Settings"
},
{
  path: "/account/orders",
  title: "Orders"
},
{
  path: "/account/favorite-list",
  title: "Favorite List"
},
{
  path: "/account/viewed-items",
  title: "Viewed Products"
}]



        return(
<div className="SideNavPage">


  <p> welcome</>
    
    
  
    
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
    name: state.userAuth.authUser.name, 
    token: state.userAuth.authUser.token,
    isAuthenticated: state.userAuth.authUser.isAuthenticated
//state.adminAuth.error
    
  }

}

export default connect(mapStateToProps,actions)(AccountUser);
