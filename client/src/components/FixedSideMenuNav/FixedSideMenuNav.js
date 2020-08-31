import React, {Component} from 'react'
import {selectAdminAuth} from  '../store/reducers/admin/auth/adminReselect';
import { Route, NavLink, Switch ,Redirect} from 'react-router-dom';
import CategoriesNav from './components/adminPage/categories/categoriesNav.component.js'
import CollectionNav from './components/adminPage/collections/TopNav/collectionsNav.component'
//import AddProduct from './components/adminPage/products/addProduct.component'
import ProductsNav from './components/adminPage/products/TopNav/productsNav.component'
import SectionsNav from './components/adminPage/sections/TopNav/sectionsNav.component'
import { connect } from 'react-redux';
import * as actions from '../store/actions/admins'
import FixedSideMenuNav from './admin.scss'
class AdminPage extends Component {

    constructor(props) {
        super(props)
        this.AdminSignOut = this.AdminSignOut.bind(this);
    }
    AdminSignOut() {
  console.log('SignOut');
  console.log('AdminSignOut adminAuth'+this.props.AdminAuth.isAuthenticated+ this.props.AdminAuth.token);
        const {signOut} = this.props

           signOut()
           console.log('after AdminSignOut adminAuth'+this.props.AdminAuth.isAuthenticated+ this.props.AdminAuth.token);
         
          
          }
          
          componentDidMount() {
     console.log('CDMount AdminAuth'+ this.props.AdminAuth.isAuthenticated+ this.props.AdminAuth.token);
    }

    componentDidUpdate() {
      console.log('CDUpdate adminAuth'+this.props.AdminAuth.isAuthenticated+ this.props.AdminAuth.token);
    }
          

    render() {


        return(
<div className="SideNavPage">
    
    <nav className="admin-nav">
    <h3>this.props.title</h3>
    {this.props.navlinks.map((navlink)=>{
return     <NavLink className="NavLinkAdmin-side"
                                to={{
                                  pathname:{navlink.pathname} 
                              }}
                             
                               
                                activeClassName="active-NavLinkAdmin-side"
                                activeStyle={{
                                  //  color: '#fa923f',
                                  //  textDecoration: 'underline',
                                  background: "#dfe3ee",
                                 // color: "#ffffff"
                                }}>{navlink.title}</NavLink>
      })} 
                            
                                
                            <button className="custum-btn-signup-admin" onClick={this.AdminSignOut }>Sign Up</button>

    </nav>
    
    <div className="admin-nav-container">
                <Switch>
                    <Route path="/admin/products" component={ProductsNav} />
                    <Route path="/admin/sections" component={SectionsNav}  />
                    <Route path="/admin/categories" component={CategoriesNav} />
                    <Route path="/admin/collections" component={CollectionNav} />
                    <Redirect from="/admin" to="/admin/products" />
                </Switch>
    </div>
    
</div>


         /*   <div>admin PAGE
<h3> welcome {this.props.Name} </h3>
<h4>{this.props.Email} </h4>
</div>*/ 
        )
    }
}

const mapStateToProps = state => {
  return {
    Name: selectAdminAuth(state).Name,
    Email: selectAdminAuth(state).Email,
    AdminAuth: selectAdminAuth(state)
//state.adminAuth.error
    
  }

}

export default connect(mapStateToProps,actions)(AdminPage);
