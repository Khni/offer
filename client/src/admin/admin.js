import React, {Component} from 'react'
import {selectAdminAuth} from  '../store/reducers/admin/auth/adminReselect';
import { Route, NavLink, Switch } from 'react-router-dom';
import AddProduct from './components/adminPage/addProduct/addProduct.component'
import AddSection from './components/adminPage/addSection/addSection.component'
import { connect } from 'react-redux';
import AdminStyle from './admin.scss'
class AdminPage extends Component {

    constructor(props) {
        super(props)
    }


    render() {


        return(
<div className="adminPage">
    
    <nav className="admin-nav">
    <ul>
                            <li>
                                <NavLink className="NavLinkAdmin"
                                to="/admin/add-product"
                                exact
                                activeClassName="my-active"
                                activeStyle={{
                                  //  color: '#fa923f',
                                  //  textDecoration: 'underline',
                                    background: '#f7f7f7'
                                }}>Add Product</NavLink></li>
                            <li><NavLink className="NavLinkAdmin"  to={{
                                pathname: '/admin/add-section'
                            }}
                            activeClassName="my-active"
                                activeStyle={{
                                  //  color: '#fa923f',
                                   // textDecoration: 'underline'
                                   background: '#f7f7f7'

                                }}
                            >Add section</NavLink></li>
                        </ul>
    </nav>
    <div className="admin-nav-container">
                <Switch>
                    <Route path="/admin/add-product" component={AddProduct} />
                    <Route path="/admin/add-section" component={AddSection} />
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
//state.adminAuth.error
    
  }

}

export default connect(mapStateToProps)(AdminPage);
