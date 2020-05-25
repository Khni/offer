import React from 'react';
import Trashicon from './img/trash.png';
import Plusicon from './img/add.png';
import Minusicon from './img/minus.png';
import { Link } from 'react-router-dom';
import CartItemstyle from './cartItem.css';

const CartItem = (props) => (
<div className="cart-Item" >
 
 <div className="cart-item-desc">
   <img src={ 'https://i.ibb.co/mh3VM1f/polka-dot-shirt.png'} className="cart-item-img"/>
   <div className="cart-item-details">
      <p className="cart-item-title margin0">Comfortable Breathable Casual Shoes - Black </p>
      <p className="cart-item-before-price margin0">   EGP 460 </p>
      <p className="cart-item-price margin0">   EGP  260 </p>
    </div>{/* end of cart-utem-details*/}
  </div>{/* end of cart-item-desc*/}
  
   <div className="cart-item-bar">
     <div className="remove-text-icon">
         <img src={Trashicon} className="trash-icon"/>
         <p className="remove-text" >REMOVE </p>
      </div>{/*remove-text-icon */}
      
      <div className="adjust-item-number">
             <img src={Minusicon} className="minus-icon"/>
             <p className="item-number">1</p>
             <img src={Plusicon} className="plus-icon"/>
      </div>{/*adjust-item-number */}
      
      <p className="movetofav-text">
      MOVE TO FAVORIT
      </p>
   </div> {/*end of cart-item-bar */}



{/*cart-item */} 
</div> 



);

export default CartItem;