import React, {Component, useEffect , useState } from "react"
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import { withRouter } from 'react-router-dom';
import * as actions from '../../store/actions';
import { connect } from 'react-redux';
class AdjustItemCount extends Component{
  constructor(props) {
    super(props);

    this.state = {
      productQty : 0,
      updateQty: false
    }


  }

  // const [cartProductQty, updateCartProductQty] =useState(false)
  // const [ProductQty, setProductQty] =useState(0)

  // useEffect(()=>{
  //    (async () => {
  //     await props.fetchCart(props.cartItems,props.token,props.isAuthenticated)
  //     console.log("cart items local: "+JSON.stringify(props.cartItems));
  //     console.log("ProductOfCart" + props.cartProducts);
  //     const Qty = props.cartProducts.find(product=> product._id == props.item._id)
  //     console.log("qty"+ Qty);
  //     //setProductQty(Qty.quantity)
  //   })();

  // },[props.cartItems])

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
//       await actions.fetchCart(props.cartItems,this.props.token,this.props.isAuthenticated)
//       console.log("cart items local: "+JSON.stringify(this.props.cartItems));
//     })();
//     console.log("cart useeffect" + JSON.stringify(this.props.cartProducts) );

//     updateCartProductQty(false)
//   }


//   }, []);
async componentDidMount () {
  await this.props.fetchCart(this.props.cartItems,this.props.token,this.props.isAuthenticated)
   console.log("cart items local: "+JSON.stringify(this.props.cartItems));
   console.log("ProductOfCart" +JSON.stringify(this.props.ProductsOfCart) );
   const Qty = this.props.ProductsOfCart.find(product=> product._id == this.props.item._id)
   console.log("qty"+ Qty.quantity);
   this.setState({productQty:Qty.quantity })
}

async componentDidUpdate () {
  if (this.state.updateQty) {
    await this.props.fetchCart(this.props.cartItems,this.props.token,this.props.isAuthenticated)
  
   const Qty = this.props.ProductsOfCart.find(product=> product._id == this.props.item._id)
   console.log("qty"+ Qty.quantity);
   this.setState({productQty:Qty.quantity,updateQty: false })


    
  }
}


increaseProductQty =async () =>{
  
  console.log("cartProducts before"+ JSON.stringify(this.props.ProductsOfCart) );
 await this.props.addItemToCartItem(this.props.item, this.props.cartItems, this.props.token , this.props.isAuthenticated)
 this.setState({updateQty: true })
  console.log("cartProducts after"+ JSON.stringify(this.props.ProductsOfCart) );

}
decreaseProductQty =async () =>{
  
  console.log("cartProducts before"+ JSON.stringify(this.props.ProductsOfCart) );
 await this.props.removeItemFromCartItem(this.props.item, this.props.cartItems, this.props.token , this.props.isAuthenticated)
 this.setState({updateQty: true })
  console.log("cartProducts after"+ JSON.stringify(this.props.ProductsOfCart) );

}

getProductQty =async ()=>{
  await actions.fetchCart(this.props.cartItems,this.props.token,this.props.isAuthenticated)
  const Qty = this.props.ProductsOfCart.find(product=> product._id === this.props.item._id)
  return Qty.quantity
}

render() {

    return (

        <div className="AdjustItemCountCountainer">
             <button className="decreaseItemCount"onClick={async() =>await this.decreaseProductQty()} >-</button>
            
    <p className="itemCount">{this.state.productQty}</p>
    <button className="increaseItemCount" onClick={async() => await this.increaseProductQty()}  >+</button>

        </div>



    );
}
}



const mapDispatchToprops = dispatch => ({
    // addItem: item => dispatch(actions.addItem(item)),
     //addItemToCartItem: (item, items) => dispatch(actions.addItemToCartItem(item, items)),
    //  removeItemFromCartItem:(item, cartItems) => dispatch(actions.removeItemFromCartItem(item, cartItems)),
    
    //  addItemToCartItem:(item, cartItems) => dispatch(actions.addItemToCartItem(item, cartItems)),
    
   });
   
   const mapStateToProps = (state) => {
     return {
      
      RefreshToken: state.userAuth.authUser.refreshToken,
      token: state.userAuth.authUser.token,
      isAuthenticated: state.userAuth.authUser.isAuthenticated,
       ProductsOfCart: state.cartProductsReducer.cartProducts,
      
     }
   }
   




export default withRouter(connect(mapStateToProps, actions)(AdjustItemCount)) 