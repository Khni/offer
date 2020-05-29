import React from 'react';
import Trashicon from './img/trash.png';
import Plusicon from './img/add.png';
import Minusicon from './img/minus.png';
import { Link } from 'react-router-dom';
import CartItemstyle from './cart-dropdown.styles.css';
import { connect } from 'react-redux';
import {addItem, removeItem} from '../../store/actions/CartItemsAction';

const CartItem = (props) =>{
	let cartdropdown = "cart-dropdown" ;
  if (!props.show) {
cartdropdown = "cart-dropdown open" ;
} 

 return (
<div className={cartdropdown} >
 <div className="cart-dropdown-content">

  <div className="cart-Item-drop-container" >

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
     <div className="remove-text-icon" onClick={() => props.removeItem(item)}>
         <img src={Trashicon} className="trash-icon"/>
         <p className="remove-text" >REMOVE </p>
      </div>{/*remove-text-icon */}
      
      <div className="adjust-item-number">
             <img src={Minusicon} className="minus-icon" onClick={() => props.removeItem(item)}/>
             <p className="item-number">{item.quantity}</p>
             <img src={Plusicon} className="plus-icon" onClick={() => props.addItem(item)}/>
      </div>{/*adjust-item-number */}
      
  
   </div> {/*end of cart-item-bar */}



{/*cart-item */} 
</div> 
  ))} 





</div>{/*cart-Item-drop-container*/} 
<div className="checkout-cart-btns">
<Link to="/cart" >
<button className="custum-btn " >View Cart List </button>
</Link>
<button className="custum-btn " >Chrckout</button>
</div>

</div> {/*cart-dropdown-content */} 
{/*dropdownitem */} 
</div>
);

} 

function mapStateToProps(state)  {
  return {
    cartItems: state.cartItemsReducer.cartItems, 
    
  };
}
const mapDispatchToProps = dispatch => ({
  removeItem: item => dispatch(removeItem(item)), 
  addItem: item => dispatch(addItem(item))
});

 
export default connect(mapStateToProps, mapDispatchToProps)(CartItem);