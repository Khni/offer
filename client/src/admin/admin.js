import React, {Component} from 'react'
import {selectAdminAuth} from  '../store/reducers/admin/auth/adminReselect';
import { Route, NavLink, Switch } from 'react-router-dom';
import AddProduct from './components/adminPage/addProduct/addProduct.component'
import AddSection from './components/adminPage/addSection/addSection.component'
import { connect } from 'react-redux';
class AdminPage extends Component {

    constructor(props) {
        super(props)
    }


    render() {


        return(
<div className="admin">
    <header>
    <nav>
    <ul>
                            <li>
                                <NavLink
                                to="/add-product"
                                exact
                                activeClassName="my-active"
                                activeStyle={{
                                    color: '#fa923f',
                                    textDecoration: 'underline'
                                }}>Add Product</NavLink></li>
                            <li><NavLink to={{
                                pathname: '/add-section'
                            }}>Add section</NavLink></li>
                        </ul>
    </nav>
    </header>
                <Switch>
                    <Route path="/add-product" component={AddProduct} />
                    <Route path="/add-section" component={AddSection} />
                </Switch>
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
