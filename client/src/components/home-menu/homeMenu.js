import React , {Component} from 'react';
import './homeMenu.css';
import {selectProducts} from '../../store/reducers/products/productsReselect'
import * as actions from '../../store/actions/product';

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
  
  
  async FetchCategoriesFromServer(){
   //   if(!this.props.categoriesFetched) {
  // this.setState({Loading: true})
     const { fetchSectionsWithProducts } = this.props;
     await fetchSectionsWithProducts();
  //   this.setState({Loading: false})
  //   }
     console.log("log from add product Updatefetchproduct" )
       
   }
  
  async componentDidMount() {
await this.FetchCategoriesFromServer()
  }
  
  
  
  
	render() {
		let {collections} =this.props
		let {categories} = this.props
		let collectionsFiltered = collections.flatMap((collection)=>collection.items).filter((item)=>
item.name.indexOf(this.state.search) !== -1) 
		
		
		
		return(
		<div className="menu-container">
		
		  <Header searchbox={true}
          SearchVal={this.state.search} 
           SearchChange={this.searchUpdate} />
           
		<div className="full-menu">
		{this.props.sectionsWithProducts.map((col)=>
  <Section key={col._id}  items={col.productsOfSection} title={col.nameEn} />
    )}
		</div>
  
  
         </div>
  
		);
		
	}
	
	 
	
	
	
}

const mapStateToProps =(state) =>{
	return {
 collections: selectProducts(state), 
 categories : state.categoryReducer.categories,

 sectionsWithProducts: state.categoryReducer.sectionsWithProducts
 //collections: state.ProductsReducer.products
	}
}

export default connect(mapStateToProps, actions)(homeMenu);