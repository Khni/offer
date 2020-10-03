import React , {Component} from 'react';
import './checkoutPayment.scss';

import * as actions from '../../../store/actions/users';
import {selectCartItems} from  '../../../store/reducers/cart/cartReselect';

import Header from '../headd/header/header'
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
const {MakeOrder} = this.props
await MakeOrder(data,token)
this.props.history.push('/orders')
console.log("sendPrder");
} 
  
  
//   async componentDidMount() {
//   await this.sendOrder()
//   }
	render() {
		
		return(
		<div className="checkoutPayment-container">
		
		  <Header  />
           
		   <p>Total Order : {this.props.total+ " EGP"}</p>

  <div className="checkout-cart-footer">



<button onClick={async()=>{await this.sendOrder(this.props.cartItems,this.props.token);} } className="custum-btn-checkout" >Confirm Order</button>

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

	}
}

export default connect(mapStateToProps, actions)(CheckPayment);