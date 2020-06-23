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
		
		return(
		<div className="menu-container">
		
		  <Header />
		<div className="full-menu">
		{this.props.collections.map((col)=>
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
	}
}

export default connect(mapStateToProps)(homeMenu);