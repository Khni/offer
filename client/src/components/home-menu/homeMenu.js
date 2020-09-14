import React , {Component} from 'react';
import './homeMenu.css';
import {selectProducts} from '../../store/reducers/products/productsReselect'


import Section from '../section/section.js';
import Header from '../header/header.js'
import { connect } from 'react-redux';

class homeMenu extends Component {
	constructor(props){
		super(props);
	
	}
	render() {
		let {collections} =this.props
		return(
		<div className="menu-container">
		
		  <Header />
		<div className="full-menu">
		{collections.map((col)=>
  <Section key={col.id}  items={col.items} title={col.title} />
    )}
		</div>
  
  
         </div>
  
		);
		
	}
	
	 
	
	
	
}

const mapStateToProps =(state) =>{
	return {
 collections: selectProducts(state)
 //collections: state.ProductsReducer.products
	}
}

export default connect(mapStateToProps)(homeMenu);