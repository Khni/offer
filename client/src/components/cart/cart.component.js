import React from 'react';
import Trashicon from './img/trash.png';
import Plusicon from './img/add.png';
import Minusicon from './img/minus.png';
import { Link } from 'react-router-dom';
import Style from './cartItemComponent/cartItem.css'
import CartItemstyle from './cart-dropdown.styles.css';
import { connect } from 'react-redux';
import {addItem, removeItem} from '../../store/actions/CartItemsAction';
import {selectCartItems} from  '../../store/reducers/cart/cartReselect';
import { withRouter } from 'react-router-dom';
import Header from '../header/header'
import Head from '../headd/header/header'
const CartItem = (props) =>{
	let cartdropdown = "cart-dropdown" ;
  if (!props.show) {
cartdropdown = "cart-dropdown open" ;
} 

 return (


 <div className="cart" >
<Head />
<div className="cartItemContainer">
{props.cartItems.map(item=>(


<div className="cart-Item" >
 
 <div className="cart-item-desc">
   <img src={"https://juvkhaled.s3-us-west-1.amazonaws.com/productsimgs/"+item.imgURLs[0].imgURL} className="cart-item-img"/>
   <div className="cart-item-details">
      <p className="cart-item-title margin0">{item.nameEn} </p>
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







<div className="checkout-cart-footer">



<button onClick={()=>props.history.push('/checkout-address')} className="custum-btn-checkout" >Checkout</button>
<p className="total-sum-cart" > {"Total: "+props.total}</p>
</div>
</div>
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