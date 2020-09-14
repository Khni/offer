import React , {Component} from 'react';
import './homeMenu.css';
import {selectProducts} from '../../store/reducers/products/productsReselect'


import Section from '../section/section.js';
import Header from '../header/header.js'
import { connect } from 'react-redux';

class homeMenu extends Component {
	constructor(props){
		super(props);
	
	this.state = {
      search: ''
    }
  }

  searchUpdate(event) {
    this.setState({ search: event.target.value.substr(0, 20) })
  }
  
	render() {
		let {collections} =this.props
		
		let collectionsFiltered = collections.flatMap.((collection)=>collection.items).filter((item)=>
item.name.indexOf(this.state.search) !== -1) 
		
		
		
		return(
		<div className="menu-container">
		
		  <Header searchbox={true}
          SearchVal={this.state.search} 
           SearchChange={this.searchUpdate} />
           
		<div className="full-menu">
		{collectionsFiltered.map((col)=>
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