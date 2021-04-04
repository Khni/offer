import React, { useEffect, useState } from "react"
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import { withRouter } from 'react-router-dom';
import * as actions from '../../store/actions';
import { connect } from 'react-redux';
const AdjustItemCount = (props) => {


  return (

    <div className="AdjustItemCountCountainer">
      <button className="decreaseItemCount" onClick={async () => await props.removeItemFromCartItem(props.item, props.cartItems, props.token, props.isAuthenticated)} >-</button>

      <p className="itemCount">{props.ProductQty}</p>
      <button className="increaseItemCount" onClick={async () => await props.addItemToCartItem(props.item, props.cartItems, props.token, props.isAuthenticated)}  >+</button>

    </div>



  );
}




export default withRouter(connect(null, actions)(AdjustItemCount))