import React , {Component} from 'react';
import './checkoutPayment.scss';

import * as actions from '../../../store/actions/users';
import {selectCartItems} from  '../../../store/reducers/cart/cartReselect';

import Header from '../../headd/header/header'
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
		
		  <h4>Confirm Order</h4>
           <table className="TableList">
           <tr><th>Price</th><th>Quantity </th><th>Product</th> </tr>
           {this.props.cartItems.map(item=>(

<tr><td>{item.price}</td><td>{item.quantity}</td><td>{item.nameEn}</td></tr>

  ))} 
           
      </table>     
           
           
           
		   <p>Total Order : {this.props.total+ " EGP"}</p>
<h5>address details </5>
<p className="centerdiv">{this.props.defaultAddress.firstName +" "+ this.props.defaultAddress.lastName} </p>
      <p className="centerdiv">{this.props.defaultAddress.street} </p>
      <p className="centerdiv">{this.props.defaultAddress.city} </p>
      <p className="centerdiv">{this.props.defaultAddress.phone} </p>
      <h4>payment on arrival </h4>
      <button onClick={async()=>{await this.sendOrder(this.props.cartItems,this.props.token);} } className="custum-btn-form" >Confirm Order</button>
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