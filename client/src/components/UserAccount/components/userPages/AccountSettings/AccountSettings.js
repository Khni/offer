import React, {Component} from 'react'
//import {selectAdminAuth} from  '../../../../../store/reducers/admin/auth/adminReselect';

import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';

import { compose } from 'redux';
//import AddproductStyle from './addProduct.scss'
//import InputForm from '../../../../components/form/inputAdminForm' 
//import SelectForm from '../../../../components/form/selectOptions.component' 
//import AddProduct from '../addItemToServer/addProduct.component'
//import ProductsList from '../TableList/productsList.component'
import '../../../../TopNav/TopNavStyle.scss'

//import * as actions from '../../../../../store/actions/users';
import {selectTermsLang} from  '../../../../../store/reducers/langReducer/langsReselect';
import * as actions from '../../../../../store/actions';
import Form from '../../../../form/Settings/formSettings.component.js';
import "./AccountSettings.scss"

class UserSettings extends Component {

    constructor(props) {
        super(props)
         this.onSubmit = this.onSubmit.bind(this);
         this.handleChangeName = this.handleChangeName.bind(this);
         this.handleChangeEmail = this.handleChangeEmail.bind(this);
         this.handleChangePhone = this.handleChangePhone.bind(this)
         this.setValues = this.setValues.bind(this);
         this.signOutUser = this.signOutUser.bind(this);
              
this.state = {
      username: props.name, 
      useremail: props.email, 
      phone: props.phone
    }
    }


signOutUser() {
const {logOut} = this.props 
logOut()
this.props.history.push('/')

} 



async onSubmit(formData) {

console.log("form data: " + JSON.stringify(formData) )


let data = {
email: this.state.useremail, 
name:this.state.username,
phone: this.state.phone
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
  
  
  
  componentDidMount(){
    console.log("phone" +this.props.phone);
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
handleChangePhone(event) {
  console.log("handlechange"+ event.target.value);
  this.setState({phone: event.target.value})
}
  



    render() {
    	



let fieldsets = [

 {
               type: "text" ,
                name:"email" ,
                ID :"email" ,
                className: "settingsFormInput" ,
                
           val:this.state.useremail,
                label: this.props.terms.email, 
                change: this.handleChangeEmail
}, 
{
                type: "name" ,
                name:"name" ,
                ID :"name" ,
              //  val:this.props.name,
                val:this.state.username, 
                className: "settingsFormInput" ,
                
                label: this.props.terms.name, 
                change: this.handleChangeName
},
{
  type: "number" ,
  name:"phone" ,
  ID :"phone" ,
//  val:this.props.name,
  val:this.state.phone, 
  className: "settingsFormInput" ,
  
  label: this.props.terms.phone, 
  change: this.handleChangePhone
}

] 
      
        return(


     <div className="TopNavPage">
       
     
 <Form
   //title="Account Details" 
   fieldsets={fieldsets}
   classNamePhone='settingsFormInput' 
   placeholderPhone='Phone Number' 
   onSubmit={this.onSubmit } 
   setVal ={this.setValues}
   changePhone={this.handleChangePhone}
   valPhone={this.state.phone} 
   submitBtnTitle="save" 
   errorMsg = {this.props.errorMsg}
          LoadingBtn = {this.props.Loading}
          removeErr={this.props.updateLeft}
          
          
   
   />
 
 
    
 <p  className="sign-up-p" onClick={this.signOutUser }>Sign out</p>
      
</div>



         
        )
    }
}

const mapStateToProps = state => {
  return {
  	Loading: state.userAuth.authUser.Loading,
  	errorMsg: state.userAuth.updatedUser.error, 
  userID: state.userAuth.authUser.id, 
  phone: state.userAuth.authUser.phone, 
  updated: state.userAuth.authUser.updated, 
  terms : selectTermsLang(state), 
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
        updateLeft: () => dispatch( actions.updateLeft())
      //  onSetAuthRedirectPath: () => dispatch( actions.setAuthRedirectPath( '/' ) )
    };
};


export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  reduxForm({ form: 'AccountSettings' })
)(UserSettings)
