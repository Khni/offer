import React, {Component} from 'react'
import {selectAdminAuth} from  '../store/reducers/admin/auth/adminReselect';
import { Route, NavLink, Switch } from 'react-router-dom';
import AddCategory from './components/adminPage/addCategory/addCategory.component'
import AddCollection from './components/adminPage/collections/TopNav/collectionsNav.component'
import AddProduct from './components/adminPage/products/addProduct.component'
import ProductsNav from './components/adminPage/products/TopNav/productsNav.component'
import AddSection from './components/adminPage/addSection/addSection.component'
import { connect } from 'react-redux';
import * as actions from '../store/actions/admins'
import AdminStyle from './admin.scss'
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
<div className="adminPage">
    
    <nav className="admin-nav">
    
                            
                                <NavLink className="NavLinkAdmin"
                                to="/admin/products"
                                exact
                                activeClassName="my-active"
                                activeStyle={{
                                  //  color: '#fa923f',
                                  //  textDecoration: 'underline',
                                  background: "#4CAF50",
                                  color: "#ffffff"
                                }}>Products</NavLink>
                               
                            <NavLink className="NavLinkAdmin"  to={{
                                pathname: '/admin/add-section'
                            }}
                            activeClassName="my-active"
                                activeStyle={{
                                  //  color: '#fa923f',
                                   // textDecoration: 'underline'
                                   background: "#4CAF50",
                                   color: "#ffffff"

                                }}
                            >Add Section</NavLink>
                        
                                                    <NavLink className="NavLinkAdmin"  to={{
                                pathname: '/admin/add-category'
                            }}
                            activeClassName="my-active"
                                activeStyle={{
                                  //  color: '#fa923f',
                                   // textDecoration: 'underline'
                                   background: "#4CAF50",
                                   color: "#ffffff"

                                }}
                            >Add Category</NavLink>
                            
                                                        <NavLink className="NavLinkAdmin"  to={{
                                pathname: '/admin/add-collection'
                            }}
                            activeClassName="my-active"
                                activeStyle={{
                                  //  color: '#fa923f',
                                   // textDecoration: 'underline'
                                   background: "#4CAF50",
                                   color: "#ffffff"

                                }}
                            >Add Collection</NavLink>
                            <button onClick={this.AdminSignOut }>Sign Up</button>

    </nav>
    
    <div className="admin-nav-container">
                <Switch>
                    <Route path="/admin/products" component={ProductsNav} />
                    <Route path="/admin/add-section" component={AddSection}  />
                    <Route path="/admin/add-category" component={AddCategory} />
                    <Route path="/admin/add-collection" component={AddCollection} />
                   
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
