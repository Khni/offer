import React, {Component} from 'react'
import {selectAdminAuth} from  '../../../../../store/reducers/admin/auth/adminReselect';
import { Route, NavLink, Switch, Redirect} from 'react-router-dom';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import * as RouterDom from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
//import AddproductStyle from './addProduct.scss'
//import InputForm from '../../../../components/form/inputAdminForm' 
//import SelectForm from '../../../../components/form/selectOptions.component' 
import AddProduct from '../addItemToServer/addProduct.component'
import ordersList from '../TableList/ordersList.component'
import TopNavStyle from '../../../../../components/TopNav/TopNavStyle.scss'
import TopNavComponent from '../../../../../components/TopNav/TopNav.component'
import * as actions from '../../../../../store/actions/product';





class ProductsNav extends Component {

    constructor(props) {
        super(props)
        
    }









    render() {

      const navlinks = [
      {
        path: "/admin/orders/orders-list/all",
        title: "all Orders"
      },
      {
        path: "/admin/orders/orders-list/unconfirmed",
        title: "Unconfirmed Orders"
      }
      ,
      ,
      {
        path: "/admin/orders/orders-list/confirmed",
        title: "Confirmed Orders"
      },
      {
        path: "/admin/orders/orders-list/shipped",
        title: "Shipped Orders"
      },
      {
        path: "/admin/orders/orders-list/delivered",
        title: "delivered Orders"
      }
      // ,
      // {
      //   path: "/admin/products/add-product",
      //   title: "Add Product"
      // }
    ]
        return(


     <div className="TopNavPage">
       <TopNavComponent navlinksArr={navlinks} />
      
 

    

      <div className="TopNav-container">
                <Switch>
                    
                    {/* <Route exact path="/admin/products/add-product" component={AddProduct}  /> */}
                    <Route exact path="/admin/orders/orders-list/:status" component={ordersList}  />
                    <Redirect from="/admin/orders" to="/admin/orders/orders-list/all" />
                   
                   
                </Switch>
    </div>
</div>



         
        )
    }
}

const mapStateToProps = state => {
  return {
  	//categories : state.categoryReducer.categories, 
  sections: state.categoryReducer.sections, 
  AdminToken: selectAdminAuth(state).token,
  AddedToServer : state.categoryReducer.AddToServer.added,
  products: state.categoryReducer.products
 //   Name: selectAdminAuth(state).Name,
   // Email: selectAdminAuth(state).Email,
//state.adminAuth.error
    
  }

}



export default  connect(mapStateToProps, actions)(ProductsNav);