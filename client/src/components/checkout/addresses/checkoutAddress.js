import React , {Component} from 'react';
import './checkoutAddressStyle.scss';
//import {selectProducts} from '../../store/reducers/products/productsReselect'
import * as actions from '../../../store/actions/product';
import Addresses from '../../UserAccount/components/userPages/AccountSettings/addresses.js'

import Header from '../../headd/header/header'
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
		<div className="header-container" >
		  <Header />
           </div>
		<Addresses />
		
		
		<button onClick={()=> this.props.history.push('/checkout-confirm')} className="custum-btn-form-fixed" >Continue </button>

  <div className="checkout-footer">




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