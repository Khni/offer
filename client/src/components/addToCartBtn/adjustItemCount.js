import React, { useEffect , useState } from "react"
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import { withRouter } from 'react-router-dom';
import * as actions from '../../store/actions';
import { connect } from 'react-redux';
const AdjustItemCount = (props) => {

  const [cartProductQty, updateCartProductQty] =useState(false)
  const [ProductQty, setProductQty] =useState(null)

  useEffect(()=>{
    const fetching =async() =>{
      await props.fetchCart(props.cartItems,props.token,props.isAuthenticated)
      console.log("removed"+JSON.stringify(props.cartItems));
      }
      fetching();
},[])

  useEffect(()=>{
   // if (props.ProductsOfCart.length>0) {
      const product = props.ProductsOfCart.find(product=> product._id == props.item._id)
      console.log("qty"+ product);
      if (product) {
        setProductQty(product.quantity)
      }
      
      console.log("ProductOfCart second" + props.ProductsOfCart);
   // }

  },[props.ProductsOfCart])

  // useEffect(() => {

  //   (async () => {
  //     await actions.fetchCart(props.cartItems,props.token,props.isAuthenticated)
  //     console.log("cart items local: "+JSON.stringify(props.cartItems));
  //     console.log("ProductOfCart" + props.cartProducts);
  //     const Qty = props.cartProducts.find(product=> product._id == props.item._id)
  //     console.log("qty"+ Qty);
  //     //setProductQty(Qty.quantity)
  //   })();
   
  //   console.log("cart useeffect" + JSON.stringify(props.cartProducts) );
  // }, []);

//   useEffect(() => {
// if (cartProductQty) {
  

//     (async () => {
//       await actions.fetchCart(props.cartItems,props.token,props.isAuthenticated)
//       console.log("cart items local: "+JSON.stringify(props.cartItems));
//     })();
//     console.log("cart useeffect" + JSON.stringify(props.cartProducts) );

//     updateCartProductQty(false)
//   }


//   }, []);



const increaseProductQty =async () =>{
  
  console.log("cartProducts before"+ JSON.stringify(props.ProductsOfCart) );
 await props.addItemToCartItem(props.item, props.cartItems, props.token , props.isAuthenticated)
 
  console.log("cartProducts after"+ JSON.stringify(props.ProductsOfCart) );

}



    return (

        <div className="AdjustItemCountCountainer">
             <button className="decreaseItemCount"onClick={async() =>{await props.removeItemFromCartItem(props.item, props.cartItems, props.token , props.isAuthenticated)
            console.log("removed"+JSON.stringify(props.cartItems));} } >-</button>
            
    <p className="itemCount">{ProductQty}</p>
    <button className="increaseItemCount" onClick={async() => await increaseProductQty()}  >+</button>

        </div>



    );
}



const mapDispatchToProps = dispatch => ({
  // fetchCartProduct: (cartItems,token,isAuthenticated)=>dispatch( actions.fetchCart(cartItems,token,isAuthenticated)) ,


    // addItem: item => dispatch(actions.addItem(item)),
    //  addItemToCartItem: (item, items) => dispatch(actions.addItemToCartItem(item, items)),
    //  removeItemFromCartItem:(item, cartItems) => dispatch(actions.removeItemFromCartItem(item, cartItems)),
    
    //  addItemToCartItem:(item, cartItems) => dispatch(actions.addItemToCartItem(item, cartItems)),
    
   });
   
   const mapStateToProps = (state) => {
     return {
      
       RefreshToken: state.userAuth.authUser.refreshToken,
       ProductsOfCart: state.cartProductsReducer.cartProducts,
      
     }
   }
   




export default withRouter(connect(mapStateToProps, actions)(AdjustItemCount)) 