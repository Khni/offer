import React, {Component} from 'react';
import CartItem from './cartItemComponent/cartItem.component';
import Cartstyle from './cart.css' 

class Cart extends Component{
   
   constructor(props) {
    super(props);
    
  }
  render() {
  
  return(
<div className="cart">
<CartItem />
</div>



)
 
}


}
export default Cart;