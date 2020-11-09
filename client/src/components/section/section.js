import React, {Component} from 'react';
import Section from './section.css';
import Item from '../menu-items/menuItems.js';
import { connect } from 'react-redux';
import {addItem} from '../../store/actions/CartItemsAction';
import { withRouter } from 'react-router-dom';
import * as Cartactions from '../../store/actions/CartItemsAction';
import { selectCartItems } from '../../store/reducers/cart/cartReselect';
import * as actions from '../../store/actions/index';

class SectionComponent extends Component {
  constructor(props) {
    super(props);
  this.state = {
    favorites : [],
    favorite : false, 
    items: [] 
  }
  }



 productsObject() {
let products = this.props.items
let productsWithFav = products.map((product)=> {
const fav = this.state.favorites.find((favorite) => favorite._id == product._id)
let Favorite = false
  if (fav) {
    Favorite = true
  } else {
    Favorite= false
  }


return {...product, isFav: Favorite} 
} )

this.setState({items: productsWithFav})
  

} 


 async componentDidMount() {
  await this.props.favoriteListAction(this.props.token)
  this.setState({favorites: this.props.FavoritesList})
  this.productsObject()
  
  
  }

isFavorite ( itemID) {
  const fav = this.state.favorites.find((favorite) => favorite._id == itemID)
  if (fav) {
    return true
  } else {
    return false
  }
}

async productsObject() {
let products = this.props.items
let productsWithFav = products.map((product)=> {
const fav = this.state.favorites.find((favorite) => favorite._id == product._id)
let Favorite = false
  if (fav) {
    Favorite = true
  } else {
    Favorite= false
  }


return {...product, isFav: Favorite} 
} )

this.setState({items: productsWithFav})
  

} 

  
  render() {
  


   return(
    

 <div className="section-menu">
 


  <h5 className="section-title">{this.props.title}</h5>
  


  <div className="menu-item">
{this.state.items.map(  (item , {...others}) => {

  /*
  Error: Objects are not valid as a React child (found: [object Promise]).
   If you meant to render a collection of children, use an array instead.
  */



const isFav =  this.isFavorite(item._id)


 return <Item favorite={item.isFav}  id={item._id} item={item} key={item._id} name={item.nameEn} imgURL={item.imgURLs[0].imgURL} price={item.price}
  {...others} />
})}
 </div>

      
		</div>
     );
}

}

const mapDispatchToProps = dispatch => ({
  addItem: item => dispatch(addItem(item)),
  addItemToCartItem: (item, items) => dispatch(Cartactions.addItemToCartItem(item, items)),
  favoriteListAction: (token) => dispatch(actions.fetchFavorites(token)),
});
const mapStateToProps =(state) =>{
	return {
 //collections: selectProducts(state), 
 token: state.userAuth.authUser.token,
 FavoritesList: state.FavAndSeenReducer.favorites.list,
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
