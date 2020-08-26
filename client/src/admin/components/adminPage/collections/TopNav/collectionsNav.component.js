import React, {Component} from 'react'
import {selectAdminAuth} from  '../../../../store/reducers/admin/auth/adminReselect';
import { Route, NavLink, Switch, Redirect} from 'react-router-dom';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import * as RouterDom from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import AddproductStyle from './addProduct.scss'
import InputForm from '../../../../../components/form/inputAdminForm' 
import SelectForm from '../../../../../components/form/selectOptions.component' 
import AddCollection from '../addItemToServer/addCollection.component'
import CollectionsList from '../TableList/collectionsList.component'
import CollectionNavStyle from './collectionsNavStyle.scss'
import * as actions from '../../../../store/actions/product';





class ProductsNav extends Component {

    constructor(props) {
        super(props)
        
    }









    render() {


        return(


     <div className="TopNav">
       <nav className="items-nav">
    
                            
    <NavLink className="NavLinkItems"
    to="/admin/collections/add-collection"
    exact
    activeClassName="my-active"
    activeStyle={{
      //  color: '#fa923f',
      //  textDecoration: 'underline',
      background: "#4CAF50",
      color: "#ffffff"
    }}>add Collection</NavLink>
   
<NavLink className="NavLinkItems"  to={{
    pathname: "/admin/collections/collections-list"
}}
activeClassName="my-active"
    activeStyle={{
      //  color: '#fa923f',
       // textDecoration: 'underline'
       background: "#4CAF50",
       color: "#ffffff"

    }}
>Collections List</NavLink>

                     


</nav>
 

    

      <div className="TopNav-container">
                <Switch>
                    
                    <Route exact path="/admin/collections/add-collection" component={AddCollection}  />
                    <Route exact path="/admin/collections/collections-list" component={CollectionsList}  />
                         <Redirect from="/admin/collections" to="/admin/collections/collections-list" />
                   
                   
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