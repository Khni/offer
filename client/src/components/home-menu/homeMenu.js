import React , {Component} from 'react';
import './homeMenu.css';
import {selectProducts} from '../../store/reducers/products/productsReselect'
import * as actions from '../../store/actions/product';
import Header from '../headd/header/header'
import Section from '../section/section.js';

import { connect } from 'react-redux';

class homeMenu extends Component {
	constructor(props){
		super(props);
	
	this.state = {
	  search: '',
	  Loading: false
    }
  }

  searchUpdate(event) {
    this.setState({ search: event.target.value.substr(0, 20) })
  }
  
  
  async FetchSectionsFromServer(){
     if(!this.props.sectionsWithProductsFetched) {
   this.setState({Loading: true})
     const { fetchSectionsWithProducts } = this.props;
     await fetchSectionsWithProducts();
     this.setState({Loading: false})
    }
     console.log("log from add product Updatefetchproduct" )
       
   }
  
  async componentDidMount() {
await this.FetchSectionsFromServer()
  }
  async componentDidUpdate(prevProps, prevState) {
    console.log("prevState:" + prevState.Loading);
    if (!prevState.Loading) {
 await this.FetchSectionsFromServer()
    }
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
           
		   {!this.state.Loading?	<div className="full-menu">
		{this.props.sectionsWithProducts.map((col)=>
  <Section key={col._id}  items={col.productsOfSection} title={col.nameEn} />
    )}
		</div>: <div className="loaderHome"/> }
  
  
         </div>
  
		);
		
	}
	
	 
	
	
	
}

const mapStateToProps =(state) =>{
	return {
 collections: selectProducts(state), 
 categories : state.categoryReducer.categories,
 sectionsWithProductsFetched: state.categoryReducer.sectionsWithProductsFetched,
 sectionsWithProducts: state.categoryReducer.sectionsWithProducts
 //collections: state.ProductsReducer.products
	}
}

export default connect(mapStateToProps, actions)(homeMenu);