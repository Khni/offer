import React, {Component} from 'react';
import './section.css';
import Item from '../menu-items/menuItems.js';
import { connect } from 'react-redux';
import {addItem} from '../../store/actions/CartItemsAction';
import { withRouter } from 'react-router-dom';
import * as Cartactions from '../../store/actions/CartItemsAction';
import { selectCartItems } from '../../store/reducers/cart/cartReselect';
// import * as actions from '../../store/actions/index';

class SectionComponent extends Component {
  constructor(props) {
    super(props);
  this.state = {
    favorites : [],
    favorite : false, 
    items: [] 
  }
  }






 async componentDidMount() {

  

  
  
  }





  
  render() {
  


   return(
    

 <div className="section-menu">
 


  <h5 className="section-title">{this.props.title}</h5>
  


  <div className="menu-item">
{this.props.items.map(  (item , {...others}) => {

  /* when using async coz it will return promise 
  Error: Objects are not valid as a React child (found: [object Promise]).
   If you meant to render a collection of children, use an array instead.
  */






  return <Item   id={item._id} item={item} key={item._id} name={item.nameEn} imgURL={item.imgURLs[0].imgURL} price={item.price}
  {...others} ToggleFavorite={this.props.ToggleFavorite} favorite={this.props.favorite} token={this.props.token}/>




})}
 </div>

      
		</div>
     );
}

}

const mapDispatchToProps = dispatch => ({
  addItem: item => dispatch(addItem(item)),
  addItemToCartItem: (item, items) => dispatch(Cartactions.addItemToCartItem(item, items)),
 
  // productsFetched: () => dispatch(actions.productsFetched()),
  
});
const mapStateToProps =(state) =>{
	return {
 //collections: selectProducts(state), 
 token: state.userAuth.authUser.token,
 
 cartItems: selectCartItems(state),
 categories : state.categoryReducer.categories,
 sectionsWithProductsFetched: state.categoryReducer.sectionsWithProductsFetched,
 sectionsWithProducts: state.categoryReducer.sectionsWithProducts
 //collections: state.ProductsReducer.products
	}
}

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(SectionComponent));
