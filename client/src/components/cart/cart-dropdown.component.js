import React from 'react';
import Trashicon from './img/trash.png';
import Plusicon from './img/add.png';
import Minusicon from './img/minus.png';
import { Link } from 'react-router-dom';
import CartItemstyle from './cart-dropdown.styles.css';
import { connect } from 'react-redux';
const CartItem = (props) => (
<div className="cart-dropdown">


{props.cartItems.map(item=>(


<div className="cart-Item-drop" >
 
 <div className="cart-item-desc">
   <img src={item.imageUrl} className="cart-item-img-drop"/>
   <div className="cart-item-details">
      <p className="cart-item-title margin0">{item.name} </p>
      <p className="cart-item-before-price margin0">   EGP {item.price *1.24} </p>
      <p className="cart-item-price margin0">   EGP   {item.price}  </p>
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
      
  
   </div> {/*end of cart-item-bar */}



{/*cart-item */} 
</div> 
  ))} 


<div className="checkout-cart-btns">
<Link to="/cart" >
<button className="custum-btn " >View Cart List </button>
</Link>
<button className="custum-btn " >Chrckout</button>
</div>
{/*dropdownitem */} 
</div>
);

function mapStateToProps(state)  {
  return {
    cartItems: state.cartItemsReducer.cartItems, 
    
  };
}
 
export default connect(mapStateToProps)(CartItem);