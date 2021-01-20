import React , {Component} from 'react';
import './checkoutPayment.scss';

import * as actions from '../../../store/actions/users';
import {selectCartItems} from  '../../../store/reducers/cart/cartReselect';


import { connect } from 'react-redux';

class CheckPayment extends Component {
	constructor(props){
		super(props);
	
	this.state = {
	  search: '',
	  Loading: false
    }
  }

  async sendOrder(data,token) {
const {MakeOrder, clearCart} = this.props
await MakeOrder(data,token)
clearCart() 
this.props.history.push('/orders')
console.log("sendPrder");
} 
  
  
//   async componentDidMount() {
//   await this.sendOrder()
//   }
	render() {
		
		return(
		<div className="checkoutPayment-container">
		
		  <h4>Confirm Order / payment on arrival  </h4>

      {this.props.cartItems.map(item=>(


<div className="cart-Item" >
 
 <div className="cart-item-desc">
   <img alt={item.nameEn} src={"https://juvkhaled.s3-us-west-1.amazonaws.com/productsimgs/"+item.imgURLs[0].imgURL} className="cart-item-img"/>
   <div className="cart-item-details">
      <p className="cart-item-title margin0">{item.nameEn} </p>
      <p className="cart-item-price margin0">X {item.quantity}</p>
      <p className="cart-item-price margin0">   EGP   {item.price}  </p>
    </div>{/* end of cart-utem-details*/}
  </div>{/* end of cart-item-desc*/}
  
   



{/*cart-item */} 
</div> 
  ))} 




          
           
           
		   <p className="total-sum-cart" >Total Order : {this.props.total+ " EGP"}</p>


       <table >
  <tr><td>Name:</td><td>{this.props.defaultAddress.firstName} </td></tr>
  <tr><td>Street:</td><td>{this.props.defaultAddress.fullAddress} </td></tr>
  <tr><td>City:</td><td>{this.props.defaultAddress.city} </td></tr>
  <tr><td>Phone:</td><td>{this.props.defaultAddress.phone} </td></tr>
</table>


      
      <button onClick={async()=>{await this.sendOrder(this.props.cartItems,this.props.token);} } className="custum-btn-form-fixed" >Confirm Order</button>
  <div className="checkout-cart-footer">





</div>
         </div>
  
		);
		
	}
	
	 
	
	
	
}

const mapStateToProps =(state) =>{
	return {
		token: state.userAuth.authUser.token,
 total: selectCartItems(state).reduce((accumalatedQuantity, item) =>accumalatedQuantity + item.quantity * item.price, 0), 
 cartItems: selectCartItems(state), 
 defaultAddress: state.addressReducer.default

	}
}

export default connect(mapStateToProps, actions)(CheckPayment);