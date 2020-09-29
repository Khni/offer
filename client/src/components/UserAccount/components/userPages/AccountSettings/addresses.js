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
import AddAddressForm from './AddAddressForm/AddAddressForm.js' 
class Addresses extends Component {

    constructor(props) {
        super(props)
         
         this.state ={
             
             list: true

              } 
         this.fetchAddresses = this.fetchAddresses.bind(this);
         this.setDefaulti = this.setDefaulti.bind(this);
              

    }


fetchAddresses(addressesArray) {
const {FetchAddressesList} = this.props 
FetchAddressesList(addressesArray)


} 

setDefaulti(address, list) {
const {setDefaultAddress} = this.props 
setDefaultAddress(address, list)


} 

async FetchAddressesFromServer() {
  //  if (!this.props.productsFetched) {

      const { FetchAddresses } = this.props;
      
      await FetchAddresses(this.props.token,this.props.defaultAddress );

   // }
    console.log("log from add product Updatefetchproduct")

  }


async componentDidMount() {

    await this.FetchAddressesFromServer()
    console.log("log from list product mound")
  console.log("default" + JSON.stringify(this.props.defaultAddress));
  }
  


  
  
  
  


  
  
  

  



    render() {
    	





let setDefault=async(address, list)=> {
const {setDefaultAddress} = this.props 
await setDefaultAddress(address, list)


} 


let cartItemClass=  "cart-Item" 
let setdefaultclass=  "remove-text default" 

let  DefaultBorder=(DefaultAddressID, addressID)=> {
	
	
	console.log("defaultAddresiD" + DefaultAddressID + "addressID" + addressID);
if(DefaultAddressID === addressID)
 {cartItemClass=  "cart-Item borderCard"}else{
cartItemClass=  "cart-Item" 
} 
}     
        return(


     <div className="TopNavPage">
     
     
  {this.props.addressesList.length > 0 && this.state.list    ? <div className="Address-container">

  <h3 onClick={()=>this.setState({list:false})}> Add New Address</h3>



       {this.props.addressesList.map((address)=>{
         
{this.props.defaultAddress ? DefaultBorder(this.props.defaultAddress._id, address._id) : " "}  
return <div className={cartItemClass} >
 
 





 <div className="cart-item-desc">
   
   <div className="cart-item-details">
      <p className="cart-item-title margin0">{address.firstName +" "+ address.lastName} </p>
      <p className="cart-item-title margin0">{address.street} </p>
      <p className="cart-item-title margin0">{address.city} </p>
      <p className="cart-item-title margin0">{address.phone} </p>

     
    </div>{/* end of cart-utem-details*/}
  </div>{/* end of cart-item-desc*/}
  
   <div className="cart-item-bar">
     <div className="remove-text-icon" >
         {this.props.defaultAddress._id != address._id ? 
         <p className="remove-text"  onClick={() => setDefault(address, this.props.addressesList) }>SET DEFAULT ADDRESS </p> : 
<p className="remove-text default-address"  > DEFAULT ADDRESS </p> 
} 


         
      </div>{/*remove-text-icon */}
      
      
      
  
   </div> {/*end of cart-item-bar */}



{/*cart-item */} 
</div> 










})}
      
 
    
 
</div> : <AddAddressForm /> } 
      
      
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
