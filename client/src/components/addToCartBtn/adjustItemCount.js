import React, { useState } from "react"
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import { withRouter } from 'react-router-dom';
import * as actions from '../../store/actions';
import { connect } from 'react-redux';
const AdjustItemCount = (props) => {






    return (

        <div className="AdjustItemCountCountainer">
             <button className="decreaseItemCount"onClick={() => props.removeItemFromCartItem(props.item, props.cartItems, props.token , props.isAuthenticated)} >-</button>
            
    <p className="itemCount">{props.itemQuantity}</p>
    <button className="increaseItemCount" onClick={() => props.addItemToCartItem(props.item, props.cartItems, props.token , props.isAuthenticated)}  >+</button>

        </div>



    );
}



const mapDispatchToProps = dispatch => ({
    // addItem: item => dispatch(actions.addItem(item)),
     //addItemToCartItem: (item, items) => dispatch(actions.addItemToCartItem(item, items)),
     removeItemFromCartItem:(item, cartItems) => dispatch(actions.removeItemFromCartItem(item, cartItems)),
    
     addItemToCartItem:(item, cartItems) => dispatch(actions.addItemToCartItem(item, cartItems)),
    
   });
   
   const mapStateToProps = (state) => {
     return {
      
       RefreshToken: state.userAuth.authUser.refreshToken,
      
     }
   }
   




export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AdjustItemCount)) 