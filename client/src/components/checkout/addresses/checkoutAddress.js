import React , {Component} from 'react';
import './checkoutAddressStyle.scss';
//import {selectProducts} from '../../store/reducers/products/productsReselect'
import * as actions from '../../../store/actions/product';
import Addresses from '../../UserAccount/components/userPages/AccountSettings/addresses.js'

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

  
	render() {
		
		
		return(
		<div className="checkoutAddresses-container">
		
		  <Header />
           
		<Addresses />
  <div className="checkout-cart-footer">



<button onClick={()=> this.props.history.push('/checkout-confirm')} className="custum-btn-checkout" >Continue </button>

</div>
         </div>
  
		);
		
	}
	
	 
	
	
	
}

const mapStateToProps =(state) =>{
	return {
 
 //collections: state.ProductsReducer.products
	}
}

export default connect(mapStateToProps, actions)(homeMenu);