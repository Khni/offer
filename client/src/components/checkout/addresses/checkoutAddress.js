import React , {Component} from 'react';
import './checkoutAddressStyle.scss';
//import {selectProducts} from '../../store/reducers/products/productsReselect'
import * as actions from '../../../store/actions/product';


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
		
		  <Header />
           
		{this.props.defaultAddress ?   <div className="cart-Item borderCard" >
 <div className="cart-item-desc">
   <div className="cart-item-details">
      <p className="cart-item-title margin0">{this.props.defaultAddress.firstName} </p>
      <p className="cart-item-title margin0">{this.props.defaultAddress.street} </p>
      <p className="cart-item-title margin0">{this.props.defaultAddress.phone} </p>
    </div>{/* end of cart-utem-details*/}
  </div>{/* end of cart-item-desc*/}
   <div className="cart-item-bar">
     <div className="remove-text-icon" >
         <p className="remove-text default-address"  > DEFAULT ADDRESS </p> 
      </div>{/*remove-text-icon */}
   </div> {/*end of cart-item-bar */}
{/*cart-item */} 
</div> :  <form></form> } 
  
         </div>
  
		);
		
	}
	
	 
	
	
	
}

const mapStateToProps =(state) =>{
	return {
 addressesList: state.userAuth.addresses.list,
  defaultAddress: state.userAuth.addresses.default
 //collections: state.ProductsReducer.products
	}
}

export default connect(mapStateToProps, actions)(homeMenu);