import React, {Component} from 'react'
//import {selectAdminAuth} from  '../../../../../store/reducers/admin/auth/adminReselect';
// import { Route, NavLink, Switch, Redirect} from 'react-router-dom';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
// import * as RouterDom from 'react-router-dom';
// import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
//import AddproductStyle from './addProduct.scss'
//import InputForm from '../../../../components/form/inputAdminForm' 
//import SelectForm from '../../../../components/form/selectOptions.component' 
//import AddProduct from '../addItemToServer/addProduct.component'
//import ProductsList from '../TableList/productsList.component'
import '../../../../TopNav/TopNavStyle.scss'
// import TopNavComponent from '../../../../TopNav/TopNav.component'
import * as actions from '../../../../../store/actions/users';
// import Form from '../../../../form/Settings/formSettings.component.js';
import AddAddressForm from './AddAddressForm/AddAddressForm.js' 
class Addresses extends Component {

    constructor(props) {
        super(props)
         
         this.state ={
             
             listToshow: true, 
             isLoading: false

              } 
         this.fetchAddresses = this.fetchAddresses.bind(this);
         this.setDefaulti = this.setDefaulti.bind(this);
          this.handleAddingAddress = this.handleAddingAddress.bind(this);

    }


fetchAddresses(addressesArray) {
const {FetchAddressesList} = this.props 
FetchAddressesList(addressesArray)


} 

handleAddingAddress() {
this.setState({listToshow: true}) 
} 

setDefaulti(address, list) {
const {setDefaultAddress} = this.props 
setDefaultAddress(address, list)


} 

async FetchAddressesFromServer() {
	this.setState({isLoading: true}) 
  //  if (!this.props.productsFetched) {

      const { FetchAddresses } = this.props;
      
      await FetchAddresses(this.props.token,this.props.defaultAddress );
this.setState({isLoading: false}) 
   // }
    console.log("log from add product Updatefetchproduct")

  }


async componentDidMount() {
console.log("addresseslost"+this.props.addressesList.length);
    await this.FetchAddressesFromServer()
    console.log("addresseslost after fetching"+this.props.addressesList.length);
    console.log("log from list product mound")
  console.log("default" + JSON.stringify(this.props.defaultAddress));
  }
  


  
  
  
  


  
  
  

  



    render() {
    	

// const showList = () => {
//   this.setState({listToshow: true})
// }



let setDefault=async(token, address)=> {
this.setState({isLoading: true}) 
  const id = {
    id: address._id
  }
  console.log(id);
const {setDefaultAddress} = this.props 


await setDefaultAddress(token, id)

this.setState({isLoading: false}) 
} 


let cartItemClass=  "cart-Item" 
// let setdefaultclass=  "remove-text default" 

let  DefaultBorder=(DefaultAddress, addressID)=> {
	if (!DefaultAddress) {
    return;
  }
	
//	console.log("defaultAddresiD" + DefaultAddressID + "addressID" + addressID);
if(DefaultAddress._id === addressID)
 {cartItemClass=  "cart-Item borderCard"}else{
cartItemClass=  "cart-Item" 
} 
}     
        return(


     <div className="TopNavPage">
     {this.state.isLoading ? <div className="loaderHome"/> : null} 
     
  {!this.state.isLoading && this.props.addressesList.length !== 0 && this.state.listToshow  ? <div className="Address-container">

  <button className="custum-btn-form" onClick={()=>this.setState({listToshow:false})}> Add New Address</button>



       {this.props.addressesList.map((address)=>{
         
{ DefaultBorder(this.props.defaultAddress, address._id) 
}  
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
         {this.props.defaultAddress._id !== address._id ? 
         <p className="remove-text"  onClick={async() =>await setDefault(this.props.token, address) }>SET DEFAULT ADDRESS </p> : 
<p className="remove-text default-address"  > DEFAULT ADDRESS </p> 
} 


         
      </div>{/*remove-text-icon */}
      
      
      
  
   </div> {/*end of cart-item-bar */}



{/*cart-item */} 
</div> 










})}
      
 
    
 
</div> : null   } 
      
    {!this.state.isLoading &&  !this.state.listToshow   ? <AddAddressForm showlist={this.handleAddingAddress}/> : null} 
    {!this.state.isLoading &&  this.props.addressesList.length === 0? <AddAddressForm showlist={this.handleAddingAddress}/> : null} 
</div>



         
        )
    }
}

const mapStateToProps = state => {
  return {
  	errorMsg: state.userAuth.authUser.error, 
  userID: state.userAuth.authUser.id, 
  addressesList: state.addressReducer.list,
  defaultAddress: state.addressReducer.default,
  
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
