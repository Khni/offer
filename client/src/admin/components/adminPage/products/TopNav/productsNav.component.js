import React, {Component} from 'react'
import {selectAdminAuth} from  '../../../../../store/reducers/admin/auth/adminReselect';
import { Route,  Switch, Redirect} from 'react-router-dom';
import { connect } from 'react-redux';

//import AddproductStyle from './addProduct.scss'
//import InputForm from '../../../../components/form/inputAdminForm' 
//import SelectForm from '../../../../components/form/selectOptions.component' 
import AddProduct from '../addItemToServer/addProduct.component'
import ProductsList from '../TableList/productsList.component'
import  '../../../../../components/TopNav/TopNavStyle.scss'
import TopNavComponent from '../../../../../components/TopNav/TopNav.component'
import * as actions from '../../../../../store/actions/product';





class ProductsNav extends Component {

    // constructor(props) {
    //     super(props)
        
    // }









    render() {

      const navlinks = [{
        path: "/admin/products/products-list",
        title: "Products List"
      },
      {
        path: "/admin/products/add-product",
        title: "Add Product"
      }]
        return(


     <div className="TopNavPage">
       <TopNavComponent navlinksArr={navlinks} />
      
 

    

      <div className="TopNav-container">
                <Switch>
                    
                    <Route exact path="/admin/products/add-product" component={AddProduct}  />
                    <Route exact path="/admin/products/products-list" component={ProductsList}  />
                    <Redirect from="/admin/products" to="/admin/products/products-list" />
                   
                   
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