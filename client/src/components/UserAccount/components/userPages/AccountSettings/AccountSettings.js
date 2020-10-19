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
//import * as actions from '../../../../../store/actions/users';
import * as actions from '../../../../../store/actions';
import Form from '../../../../form/Settings/formSettings.component.js';
import "./AccountSettings.scss"

class UserSettings extends Component {

    constructor(props) {
        super(props)
         this.onSubmit = this.onSubmit.bind(this);
         this.handleChangeName = this.handleChangeName.bind(this);
         this.handleChangeEmail = this.handleChangeEmail.bind(this);
         this.setValues = this.setValues.bind(this);
         this.signOutUser = this.signOutUser.bind(this);
              
this.state = {
      username: props.name, 
      useremail: props.email
    }
    }


signOutUser() {
const {logOut} = this.props 
logOut()
this.props.history.push('/')

} 



async onSubmit(formData) {

console.log("form data: " + JSON.stringify(formData) )

const { UpdateUser } = this.props;

let data = {
email: this.state.useremail, 
name:this.state.username
} 
const token =this.props.token
console.log("form data: " + JSON.stringify(formData) )
this.props.updateUser(data,"updateuser",token)
 //  await UpdateUser(data, this.props.userID)
  // alert("form userData: " + JSON.stringify(UserToUpdate)) 
 //  alert("form data: " + JSON.stringify(formData)) 
   if (this.props.updated) {
      
       alert("details updated successfully! ") 
    window.location.reload();
    }
  
  }
  
  
  
  
  
  setValues() {
this.props.initialize({ email: this.state.useremail,
name:this.state.username
});
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
   //title="Account Details" 
   fieldsets={fieldsets}
   
   onSubmit={this.onSubmit } 
   setVal ={this.setValues}
   
   submitBtnTitle="submit" 
   
   
   />
 
 
    
 <p  className="sign-up-p" onClick={this.signOutUser }>Sign out</p>
      
</div>



         
        )
    }
}

const mapStateToProps = state => {
  return {
  	errorMsg: state.userAuth.authUser.error, 
  userID: state.userAuth.authUser.id, 
  updated: state.userAuth.authUser.updated, 
  
    name: state.userAuth.authUser.name, 
    token: state.userAuth.authUser.token,
    email: state.userAuth.authUser.email, 
    isAuthenticated: state.userAuth.authUser.isAuthenticated
    
  }

}

const mapDispatchToProps = dispatch => {
    return {
        logOut: () => dispatch( actions.logout() ),
        updateUser: (data, action, token) => dispatch( actions.updateUser(data, action, token) ),
      //  onSetAuthRedirectPath: () => dispatch( actions.setAuthRedirectPath( '/' ) )
    };
};


export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  reduxForm({ form: 'AccountSettings' })
)(UserSettings)
