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
import Form from '../../../../form/Settings/formSettings.component.js';

class UserSettings extends Component {

    constructor(props) {
        super(props)
        this.onSubmit = this.onSubmit.bind(this);
    }






async onSubmit(formData) {

console.log("form data: " + JSON.stringify(formData) )

const { UpdateUser } = this.props;
console.log("form data: " + JSON.stringify(formData) )
   await UpdateUser(formData)
   if (this.props.updated) {
      
       alert("details updated successfully! ") 
    window.location.reload();
    }
  
  }



    render() {

      fieldsets = [

 {
               type: "text" ,
                name:"email" ,
                ID :"email" ,
                className: "settingsFormInput" ,
                
                label: "Email" 
}, 
{
                type: "name" ,
                name:"name" ,
                ID :"name" ,
                className: "settingsFormInput" ,
                
                label: "Name" 
}
] 
        return(


     <div className="TopNavPage">
       
      
 <Form
   title="Account Details" 
   fieldsets={this.fieldsets}
   
   onSubmit={this.onSubmit } 
   
   
   submitBtnTitle="submit" 
   
   
   />
 

    

      
</div>



         
        )
    }
}

const mapStateToProps = state => {
  return {
  	errorMsg: state.userAuth.authUser.error, 
  updated: state.userAuth.authUser.updated, 
  
    name: state.userAuth.authUser.name, 
    token: state.userAuth.authUser.token,
    email: state.userAuth.authUser.email, 
    isAuthenticated: state.userAuth.authUser.isAuthenticated
    
  }

}



export default  connect(mapStateToProps, actions)(UserSettings);