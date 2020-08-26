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
import AddSection from '../addSection.component'
import ProductsList from '../TableList/sectionsList.component'
import SectionsNavStyle from './sectionsNavStyle.scss'
import * as actions from '../../../../../store/actions/product';





class ProductsNav extends Component {

    constructor(props) {
        super(props)
        
    }









    render() {


        return(


     <div className="TopNav">
       <nav className="items-nav">
    
                            
    <NavLink className="NavLinkItems"
    to="/admin/products/add-product"
    exact
    activeClassName="my-active"
    activeStyle={{
      //  color: '#fa923f',
      //  textDecoration: 'underline',
      background: "#4CAF50",
      color: "#ffffff"
    }}>add Product</NavLink>
   
<NavLink className="NavLinkItems"  to={{
    pathname: "/admin/products/products-list"
}}
activeClassName="my-active"
    activeStyle={{
      //  color: '#fa923f',
       // textDecoration: 'underline'
       background: "#4CAF50",
       color: "#ffffff"

    }}
>Products List</NavLink>

                     


</nav>
 

    

      <div className="TopNav-container">
                <Switch>
                    
                    <Route exact path="/admin/sections/add-section" component={AddSection}  />
                    <Route exact path="/admin/sections/sections-list" component={SectionsList}  />
                         <Redirect from="/admin/sections" to="/admin/sections/sections-list" />
                   
                   
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