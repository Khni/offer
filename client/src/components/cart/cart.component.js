import React, { useEffect } from 'react';
import Trashicon from './img/trash.svg';
import Plusicon from './img/plus.svg';
import Minusicon from './img/minus.svg';
// import { Link } from 'react-router-dom';
import './cartItemComponent/cartItem.css'
import './cart-dropdown.styles.css';
import { connect } from 'react-redux';
// import {addItem, removeItem} from '../../store/actions/CartItemsAction';
import { selectCartItems } from '../../store/reducers/cart/cartReselect';
import * as actions from '../../store/actions/CartItemsAction';
import { withRouter } from 'react-router-dom';

import Head from '../headd/header/header'
class CartItem extends React.Component {

  constructor(props) {
    super(props);

    this.state ={
      filterdCart: []
    }



    
   
   

  }
  








 async componentDidMount() {
  await this.props.fetchCart(this.props.cartItems, 
    this.props.token,
     this.props.isAuthenticated)

    let cart = this.props.cartProducts.filter(product => product.quantity !== 0)
    console.log("cartfiltered" + cart);
     console.log("cartItem" + this.props.cartProducts);
  }
  
  
  async componentDidUpdate() {
  	if(this.props.updateCart) {
  await this.props.fetchCart(this.props.cartItems, 
    this.props.token,
     this.props.isAuthenticated)
     console.log("cartItem" + this.props.cartProducts);
    
    } 
  }
  
  
      
  








  // 	let cartdropdown = "cart-dropdown" ;
  //   if (!props.show) {
  // cartdropdown = "cart-dropdown open" ;
  // } 


  /*
  await props.cartitems.map(item =>{
  let response_product = await axios.post('getproduct', item._id) 
  item = {...item, item.availableQty:response_product.availableQty, item.price:response_product.price} 
  if (response_product.aviableQty<item.quantity) {
  item.quantity=response_aviableQty
  } 
  if (response_product.aviableQty===0) {
  	
  item.price=0
  item.quantity=0
  } 
  
  } )
  
  */


  checkoutRedirectPush ()  {
    this.props.chechoutRedirect()
    this.props.history.push({
      pathname: '/authnav',
      //search: '?query=abc',
      //state: { targetUrl: '/checkout-address' }
    })
  }


  render(){
  return (


    <div className="cart" >
      <div className="header-container" >
        <Head />
      </div>

      {this.props.cartProducts.length == 0 ? <h2 className="EmprtCart">Cart is Empty</h2> :  




        <div className="cartItemContainer">
          {this.props.cartProducts.map(item => (

            
        

         

            <div className="cart-Item" >

          {item.quantity === 0 ? 
          <div className="cart-item-desc">
          <img alt={item.nameEn} src={"https://juvkhaled.s3-us-west-1.amazonaws.com/productsimgs/" + item.imgURLs[0].imgURL} className="cart-item-img" />
          <div className="cart-item-details">
            <p className="cart-item-title margin0"><h5>OUT OF STOCK</h5> </p>
           
          </div>
          </div> :


         <div> 
          <div className="cart-item-desc">
                <img alt={item.nameEn} src={"https://juvkhaled.s3-us-west-1.amazonaws.com/productsimgs/" + item.imgURLs[0].imgURL} className="cart-item-img" />
                <div className="cart-item-details">
                  <p className="cart-item-title margin0">{item.nameEn} </p>
                  <p className="cart-item-before-price margin0">   EGP {item.price * 1.24} </p>
                  <p className="cart-item-price margin0">   EGP   {item.price}  </p>
                </div>{/* end of cart-utem-details*/}
              </div>{/* end of cart-item-desc*/}

              <div className="cart-item-bar">
                <div className="remove-text-icon" onClick={() => this.props.deleteItemFromCartItem(item, this.props.cartItems)} >
                  <img alt="delete" src={Trashicon} className="trash-icon" />
                  <p className="remove-text" >REMOVE </p>
                </div>{/*remove-text-icon */}

                <div className="adjust-item-number">
                  <img alt="-" src={Minusicon} className="minus-icon" onClick={() => this.props.removeItemFromCartItem(item, this.props.cartItems)} />
                  <p className="item-number">{item.quantity}</p>
                  <img alt="+" src={Plusicon} className="plus-icon" onClick={() =>this.props.addItemToCartItem(item, this.props.cartItems)} />
                </div>{/*adjust-item-number */}


              </div> {/*end of cart-item-bar */}
        </div>
        }




              {/*cart-item */}
            </div>
          ))}





          <p className="total-sum-cart" > {"Total: " + this.props.totalPrice}</p>

          {!this.props.isAuthenticated && !this.props.token ?
            <button onClick={() => this.checkoutRedirectPush()} className="custum-btn-form-fixed" >Checkout</button>
            : <button onClick={() => this.props.history.push('/checkout-address')} className="custum-btn-form-fixed" >Checkout</button>}





          <div className="checkout-cart-footer">





          </div>
        </div>

      }





    </div>
  )
    }

}

function mapStateToProps(state) {
  return {
    token: state.userAuth.authUser.token,
    cartIsLoading: state.cartProductsReducer.isLoading,
    updateCart: state.cartProductsReducer.updateCart,
    cartProducts: state.cartProductsReducer.cartProducts,
    filteredCart: state.cartProductsReducer.filteredCart,
    totalPrice: state.cartProductsReducer.totalPrice,
    isAuthenticated: state.userAuth.authUser.isAuthenticated,
    cartItems: selectCartItems(state),

   // total: selectCartItems(state).reduce((accumalatedQuantity, item) => accumalatedQuantity + item.quantity * item.price, 0)

    total: 0


  };
}
// const mapDispatchToProps = dispatch => ({


// 	// chechoutRedirect: () => chechoutRedirect(), 


//   removeItem: item => dispatch(removeItem(item)), 
//   addItem: item => dispatch(addItem(item))
// });


export default withRouter(connect(mapStateToProps, actions)(CartItem));