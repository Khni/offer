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
import * as actions from '../../../../../store/actions/users';
import Form from '../../../../form/Settings/formSettings.component.js';

class Addresses extends Component {

    constructor(props) {
        super(props)
         this.onSubmit = this.onSubmit.bind(this);
         this.handleChangeName = this.handleChangeName.bind(this);
         this.handleChangeEmail = this.handleChangeEmail.bind(this);
         this.setValues = this.setValues.bind(this);
         this.fetchAddresses = this.fetchAddresses.bind(this);
              
this.state = {
      username: props.name, 
      useremail: props.email
    }
    }


fetchAddresses(addressesArray) {
const {FetchAddressesList} = this.props 
FetchAddressesList(addressesArray)


} 



async onSubmit(formData) {

console.log("form data: " + JSON.stringify(formData) )

const { UpdateUser } = this.props;

let UserToUpdate = {
email: this.state.useremail, 
name:this.state.username
} 

console.log("form data: " + JSON.stringify(formData) )
   await UpdateUser(UserToUpdate, this.props.userID)
   alert("form userData: " + JSON.stringify(UserToUpdate)) 
   alert("form data: " + JSON.stringify(formData)) 
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
    	
const Adresses = [
{
street: '6 Zaki Abo soud', 
phone: 12345,
firstName: 'khaled' 
}, 
{
street: '8 soudan', 
phone: 6789,
firstName: 'bsa' 
} 
] 


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
       {this.props.addressesList.map((address)=>{

return <div>
<p>{address.street}</p>
<p>{address.phone}</p>
<p>{address.firstName}</p>

</div>
})}
      
 
    
 <button  className="custum-btn" onClick={this.fetchAddresses }>click </button>

      
      
</div>



         
        )
    }
}

const mapStateToProps = state => {
  return {
  	errorMsg: state.userAuth.authUser.error, 
  userID: state.userAuth.authUser.id, 
  addressesList: state.userAuth.addresses.list,
  
    name: state.userAuth.authUser.name, 
    token: state.userAuth.authUser.token,
    email: state.userAuth.authUser.email, 
    isAuthenticated: state.userAuth.authUser.isAuthenticated
    
  }

}




export default compose(
  connect(mapStateToProps, actions),
  reduxForm({ form: 'AccountSettings' })
)(Addresses)
