import React, {Component} from 'react'
import {selectAdminAuth} from  '../store/reducers/admin/auth/adminReselect';
import { Route,  Switch ,Redirect} from 'react-router-dom';
import CategoriesNav from './components/adminPage/categories/categoriesNav.component.js'
import CollectionNav from './components/adminPage/collections/TopNav/collectionsNav.component'
//import AddProduct from './components/adminPage/products/addProduct.component'
import Reviews from './components/adminPage/reviews/TopNav/reviewsNav'
import ProductsNav from './components/adminPage/products/TopNav/productsNav.component'
import OrdersNav from './components/adminPage/orders/TopNav/ordersNav.component'
import SectionsNav from './components/adminPage/sections/TopNav/sectionsNav.component'
import { connect } from 'react-redux';
import * as actions from '../store/actions/admins'

import  '../components/FixedSideMenuNav/FixedSideMenuNav.scss'
import SideNavComponent from '../components/FixedSideMenuNav/FixedSideMenuNav'
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
const navlinks = [{
  path: "/admin/products",
  title: "Products"
},
{
  path: "/admin/sections",
  title: "Sections"
},
{
  path: "/admin/categories",
  title: "Categories"
},
{
  path: "/admin/collections",
  title: "Collections"
},
{
  path: "/admin/orders",
  title: "Orders"
},

{
  path: "/admin/reviews",
  title: "Reviews"
}

]

const buttons = [{
  title: "Sign Up",
  onClickFunc :this.AdminSignOut
}]

        return(
<div className="SideNavPage">


  <SideNavComponent navlinksArr={navlinks}
  title='Admin Dashboard'
  btns={true} 
  buttons={buttons}/>
    
    
  
    
    <div className="side-nav-container">
                <Switch>
                    <Route path="/admin/products" component={ProductsNav} />
                    <Route path="/admin/sections" component={SectionsNav}  />
                    <Route path="/admin/categories" component={CategoriesNav} />
                    <Route path="/admin/collections" component={CollectionNav} />
                    <Route path="/admin/orders" component={OrdersNav} />
                    <Route path="/admin/reviews" component={Reviews} />
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
