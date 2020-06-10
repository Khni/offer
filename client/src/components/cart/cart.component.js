import React, {Component} from 'react';
import CartItem from './cartItemComponent/cartItem.component';
import Cartstyle from './cart.css' 
import { connect } from 'react-redux';
import {selectCartItems} from  '../../store/reducers/cart/cartReselect';
class Cart extends Component{
   
   constructor(props) {
    super(props);
    
  }
  render() {
  
  return(
<div className="cart">
  {this.props.cartItems.map(item=>(
   <CartItem
    name={item.name} 
    price={item.price} 
    beforeprice={item.price *1.52} 
    name={item.name} 
    imgURL={item.imageUrl} 
     />
   
  ))} 

</div>



)
 
}


}
function mapStateToProps(state)  {
  return {
    cartItems: selectCartItems(state) , 
    
  };
}
 
export default connect(mapStateToProps)(Cart);