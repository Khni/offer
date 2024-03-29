import React from 'react';
import Trashicon from './img/trash.png';
import Plusicon from './img/add.png';
import Minusicon from './img/minus.png';

import './cart-dropdown.styles.css';
import { connect } from 'react-redux';
import {addItem, removeItem} from '../../store/actions/CartItemsAction';
import {selectCartItems} from  '../../store/reducers/cart/cartReselect';
import { withRouter } from 'react-router-dom';

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
   <img alt={item.nameEn} src={"https://juvkhaled.s3-us-west-1.amazonaws.com/productsimgs/"+item.imgURLs[0].imgURL} className="cart-item-img-drop"/>
   <div className="cart-item-details">
      <p className="cart-item-title margin0">{item.nameEn} </p>
      <p className="cart-item-before-price margin0">   EGP {item.price *1.24} </p>
      <p className="cart-item-price margin0">   EGP   {item.price}  </p>
    </div>{/* end of cart-utem-details*/}
  </div>{/* end of cart-item-desc*/}
  
   <div className="cart-item-bar">
     <div className="remove-text-icon" onClick={() => props.removeItem(item)}>
         <img alt="delete" src={Trashicon} className="trash-icon"/>
         <p className="remove-text" >REMOVE </p>
      </div>{/*remove-text-icon */}
      
      <div className="adjust-item-number">
             <img alt="-" src={Minusicon} className="minus-icon" onClick={() => props.removeItem(item)}/>
             <p className="item-number">{item.quantity}</p>
             <img alt="+" src={Plusicon} className="plus-icon" onClick={() => props.addItem(item)}/>
      </div>{/*adjust-item-number */}
      
  
   </div> {/*end of cart-item-bar */}



{/*cart-item */} 
</div> 
  ))} 





</div>{/*cart-Item-drop-container*/} 
<div className="total-sum" >{"Total: "+props.total}</div>
<div className="checkout-cart-btns">
<button className="custum-btn " onClick={()=>props.history.push("/cart")} >CART LIST</button>


<button className="custum-btn " onClick={()=>props.history.push("/checkout-address")} >Checkout</button>
</div>

</div> {/*cart-dropdown-content */} 
{/*dropdownitem */} 
</div>
);

} 

function mapStateToProps(state)  {
  return {
    cartItems: selectCartItems(state), 
    total: selectCartItems(state).reduce((accumalatedQuantity, item) =>accumalatedQuantity + item.quantity * item.price, 0)

    
  };
}
const mapDispatchToProps = dispatch => ({
  removeItem: item => dispatch(removeItem(item)), 
  addItem: item => dispatch(addItem(item))
});

 
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CartItem));