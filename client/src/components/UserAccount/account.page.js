import React, {Component} from 'react'
//import {selectAdminAuth} from  '../store/reducers/admin/auth/adminReselect';
import { Route, NavLink, Switch ,Redirect} from 'react-router-dom';
import AccountSettingsNav from './components/userPages/AccountSettings/AccountSettingsNav.js'
import Orders from'./components/userPages/Orders/Orders.js'
//import AddProduct from './components/adminPage/products/addProduct.component'
import FavoriteList from './components/userPages/FavoriteList/FavoriteList.js'
import ViewedItems from './components/userPages/ViewedItems/ViewedItems.js'
import { connect } from 'react-redux';
import * as actions from '../../store/actions/users.js'
import Header from '../header/header'
import SideNavStyle from '../FixedSideMenuNav/FixedSideMenuNav.scss'
import SideNavComponent from '../FixedSideMenuNav/FixedSideMenuNav'
class  AccountUser extends Component {

    constructor(props) {
        super(props)
       
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
<div className="header-container">
<Header />
</div>


<div className="SideNavPage-container" >
  <SideNavComponent navlinksArr={navlinks}
 // title={this.props.name}
//  btns={true} 
  //buttons={buttons}
  />
    
    
  
    
    <div className="side-nav-container">
                <Switch>
                    <Route path="/account/settings" component={AccountSettingsNav} />
                    <Route path="/account/orders" component={Orders}  />
                    <Route path="/account/favorite-list" component={FavoriteList} />
                    <Route path="/account/viewed-items" component={FavoriteList} />
                    <Redirect from="/account" to="/account/settings" />
                    
                </Switch>
               
    </div>
    

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
