import React , {Component} from 'react';
import './checkoutPayment.scss';

import * as actions from '../../../store/actions/product';
import {selectCartItems} from  '../../../store/reducers/cart/cartReselect';

import Header from '../../header/header.js'
import { connect } from 'react-redux';

class homeMenu extends Component {
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
} 
  
  
  
	render() {
		
		return(
		<div className="menu-container">
		
		  <Header  />
           
		   <p></p>

  <div className="checkout-cart-footer">



<button onClick={async() =>await this.sendOrder(this.props.cartItems,this.props.token) } className="custum-btn-checkout" >Confirm Order</button>

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

export default connect(mapStateToProps, actions)(homeMenu);