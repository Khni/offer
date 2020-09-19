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
         this.setDefault = this.setDefault.bind(this);
              
this.state = {
      username: props.name, 
      useremail: props.email
    }
    }


fetchAddresses(addressesArray) {
const {FetchAddressesList} = this.props 
FetchAddressesList(addressesArray)


} 

setDefault(address, list) {
const {setDefaultAddress} = this.props 
setDefaultAddress(address, list)


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
firstName: 'khaled' ,
id: 2
}, 
{
street: '8 soudan', 
phone: 6789,
firstName: 'bsa' ,
id: 3
},
{
street: '9 makram', 
phone: 676466,
firstName: 'bezo' ,
id: 9
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

let cartItemClass=  "cart-Item" 
      
        return(


     <div className="TopNavPage">
       {this.props.addressesList.map((address)=>{

return <div className={cartItemClass} >
 
 <div className="cart-item-desc">
   
   <div className="cart-item-details">
      <p className="cart-item-title margin0">{address.street} </p>
      <p className="cart-item-before-price margin0">    {address.phone}</p>
      <p className="cart-item-price margin0">    {address.name}  </p>
    </div>{/* end of cart-utem-details*/}
  </div>{/* end of cart-item-desc*/}
  
   <div className="cart-item-bar">
     <div className="remove-text-icon" >
         {this.props.defaultAddress.id != address.id ? 
         <p className="remove-text"  onClick={() => this.setDefault(address, this.props.addressesList) }>SET DEFAULT ADDRESS </p> : 
<p className="remove-text"  > DEFAULT ADDRESS </p> 
} 
{this.props.defaultAddress.id == address.id ? cartItemClass=  "cart-Item borderCard"} 

         
      </div>{/*remove-text-icon */}
      
      
      
  
   </div> {/*end of cart-item-bar */}



{/*cart-item */} 
</div> 










})}
      
 
    
 <button  className="custum-btn" onClick={() => this.fetchAddresses(Adresses)}>click </button>

      
      
</div>



         
        )
    }
}

const mapStateToProps = state => {
  return {
  	errorMsg: state.userAuth.authUser.error, 
  userID: state.userAuth.authUser.id, 
  addressesList: state.userAuth.addresses.list,
  defaultAddress: state.userAuth.addresses.default,
  
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
