import React, { useEffect, useState } from "react"
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import { withRouter } from 'react-router-dom';
import * as actions from '../../store/actions';
import { connect } from 'react-redux';
const AdjustItemCount = (props) => {
  const [productID, setProductID] = useState('')
  return (

    <div className="AdjustItemCountCountainer">
      {console.log("productIDss")}
      <button className="decreaseItemCount" onClick={async () => await props.removeItemFromCartItem(props.item, props.cartItems, props.token, props.isAuthenticated)} >-</button>

      <p className="itemCount">{props.isLoading && productID === props.item._id ? <div className="loaderCount"/> : props.ProductQty}</p>
      <button className="increaseItemCount" onClick={async () =>
      {setProductID(props.item._id)
      //   console.log("productID"+productID +' ' +props.item._id);
      // console.log("productIDitem"+props.item._id);
        await props.addItemToCartItem(props.item, props.cartItems, props.token, props.isAuthenticated)
      
      } }  >+</button>

    </div>



  );
}




export default withRouter(connect(null, actions)(AdjustItemCount))