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
import List from './reviewsNav.component'
import TopNavStyle from '../../../../../components/TopNav/TopNavStyle.scss'
import TopNavComponent from '../../../../../components/TopNav/TopNav.component'
import * as actions from '../../../../../store/actions/product';
import ListComponent from './reviewsNav.component'
import axios from "axios"






class ProductsNav extends Component {

    constructor(props) {
        super(props)
        
    }








async fetchReviews(status,token) {

  console.log("fetchList");
  const response =   await axios.get('/api/reviews/'+ status, {
    headers : { Authorization: `Bearer ${token}`
     }} );

     return response.data.reviews

}
    render() {
      const Ato = "bsa"
      const navlinks = [
      {
        path: "/admin-reviews/list/notactive",
        title: "Not Active Reviews"
      },
      {
        path: "/admin-reviews/list/active",
        title: "Active Reviews"
      }
    ]
        return(


     <div className="TopNavPage">


<ListComponent  
navlinks={navlinks}
mainRoute="/admin-reviews"
subRoute= "/admin-reviews/list"
redirectLink ="/admin-reviews/list/active"
fetchList = {this.fetchReviews}
Ato = {Ato}
adminToken = {this.props.AdminToken}
/>



     
      
 

    

    
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