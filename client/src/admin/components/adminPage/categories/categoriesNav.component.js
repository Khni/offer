import React, {Component} from 'react'
import {selectAdminAuth} from  '../../../../store/reducers/admin/auth/adminReselect';
import { Route, NavLink, Switch, Redirect} from 'react-router-dom';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import * as RouterDom from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
//import AddcategoriesStyle from './addCategory.scss'
import InputForm from '../../../../components/form/inputAdminForm' 
import SelectForm from '../../../../components/form/selectOptions.component' 
import AddCategory from './addCategory.component'
import CategoriesList from './categoriesList.component'
import CategoryNavStyle from './categoriesNavStyle.scss'
import * as actions from '../../../../store/actions/product';





class CategoriesNav extends Component {

    constructor(props) {
        super(props)
        
    }









    render() {


        return(


     <div className="ProductsNav">
       <nav className="items-nav">
    
                            <NavLink className="NavLinkItems"  to={{
    pathname: "/admin/categories/categories-list"
}}
activeClassName="my-active"
    activeStyle={{
      //  color: '#fa923f',
       // textDecoration: 'underline'
       background: "#0083B0",
      color: "#ffffff"

    }}
>Products List</NavLink>



    <NavLink className="NavLinkItems"
    to="/admin/categories/add-category"
    exact
    activeClassName="my-active"
    activeStyle={{
      //  color: '#fa923f',
      //  textDecoration: 'underline',
      background: "#0083B0",
      color: "#ffffff"
    }}>add Category</NavLink>
   


                     


</nav>
 

    

      <div className="products-nav-container">
                <Switch>
                    
                    <Route exact path="/admin/categories/add-category" component={AddCategory}  />
                    <Route exact path="/admin/categories/categories-list" component={CategoriesList}  />
                         <Redirect from="/admin/categories" to="/admin/categories/categories-list" />
                   
                   
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



export default  connect(mapStateToProps, actions)(CategoriesNav);