import React from 'react';
import MenuItems from './menuItems.scss';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { ReactComponent as AddFavorite } from '../productPage/icons/heartempty.svg'
import { ReactComponent as FavoriteAdded } from '../productPage/icons/Heartfull.svg'

import { connect } from 'react-redux';
import {addItem} from '../../store/actions/CartItemsAction';
import { withRouter } from 'react-router-dom';
import * as Cartactions from '../../store/actions/CartItemsAction';
import { selectCartItems } from '../../store/reducers/cart/cartReselect';
import * as actions from '../../store/actions/index';
const menuItems = (props, {history,match})=>{
/*
const inFavorite() {
const favProduct = props.favList.find((f)f.productID == props.item._id)
if (favProduct) {
return true;
} 
} 

onClick={() => props.history.push(`${props.match.url+"item/" }${props.id}`)}
*/
   return(
   <div>
   
    <div  className="item" 
    >
   <Link to=`${props.match.url+"item/" }${props.id}`>
   
   
   
 

<img src={"https://juvkhaled.s3-us-west-1.amazonaws.com/productsimgs/"+props.imgURL}  className="item-img"/>

<p className="item-title-menu-item">{props.item.nameEn} </p>



<p className="item-before-price">   {props.item.price * 1.23}   EGP </p>

<p className="item-price">  {props.item.price}  EGP  </p>


</Link>
<div className="flex-row">
<button className="custum-btn-form "  onClick={() => props.addItemToCartItem(props.item,props.cartItems)}>ADD TO CART  </button>
<div><AddFavorite /></div>
</div>
</div>










</div>
     );
}
const mapDispatchToProps = dispatch => ({
  addItem: item => dispatch(addItem(item)),
  addItemToCartItem: (item, items) => dispatch(Cartactions.addItemToCartItem(item, items)),
  favoriteListAction: (token) => dispatch(actions.fetchFavorites(token)),
});
const mapStateToProps =(state) =>{
	return {
 //collections: selectProducts(state), 
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
)(menuItems));