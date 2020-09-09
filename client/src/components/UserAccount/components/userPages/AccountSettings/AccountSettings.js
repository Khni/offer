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
         this.handleChangeName = this.handleChangeName.bind(this);
         this.handleChangeEmail = this.handleChangeEmail.bind(this);
              
this.state = {
      username: props.name, 
      useremail: props.email
    }
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
  
  
  
  
  handleChangeName(event) {
  this.setState({username: event.target.value})
}
  
  
  handleChangeEmail(event) {
  this.setState({useremail: event.target.value})
}
  



    render() {
let fieldsets = [

 {
               type: "text" ,
                name:"email" ,
                ID :"email" ,
                className: "settingsFormInput" ,
            //    val: this.props.email,
            val:this.state.useremail,
                label: "Email", 
                change: this.handleChangeEmail
}, 
{
                type: "name" ,
                name:"name" ,
                ID :"name" ,
              //  val:this.props.name,
                val:this.state.username, 
                className: "settingsFormInput" ,
                
                label: "Name", 
                change: this.handleChangeName
}
] 
      
        return(


     <div className="TopNavPage">
       
      
 <Form
   title="Account Details" 
   fieldsets={fieldsets}
   
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