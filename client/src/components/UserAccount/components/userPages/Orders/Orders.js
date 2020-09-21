import React, {Component} from 'react'
//import {selectAdminAuth} from  '../../../../../store/reducers/admin/auth/adminReselect';
import { Route, NavLink, Switch, Redirect} from 'react-router-dom';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import * as RouterDom from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
//import AddproductStyle from './addProduct.scss'
//import InputForm from '../../../../components/form/inputAdminForm' 
//import SelectForm from '../../../../components/form/selectOptions.component' 
//import AddProduct from '../addItemToServer/addProduct.component'
//import ProductsList from '../TableList/productsList.component'
import TopNavStyle from '../../../../TopNav/TopNavStyle.scss'
import TopNavComponent from '../../../../TopNav/TopNav.component'
import * as actions from '../../../../../store/actions/product';


class UserOrders extends Component {

    constructor(props) {
        super(props)
        
    }









    render() {

      
        return(


     <div className="TopNavPage">
       
      
 <h3>Orders List</h3>

    <img src='/imgs/upload-1600693335641.png' alt="addidas"  />

      
</div>



         
        )
    }
}

const mapStateToProps = state => {
  return {
  	errorMsg: state.userAuth.authUser.error, 
    name: state.userAuth.authUser.name, 
    token: state.userAuth.authUser.token,
    isAuthenticated: state.userAuth.authUser.isAuthenticated
    
  }

}



export default  connect(mapStateToProps, actions)(UserOrders);