import React, { Component } from 'react';
import './checkoutPayment.scss';
import axios from 'axios';
import Form from '../../form/form.component'
import * as Calls from '../../../store/actions/axiosCalls'
import * as actions from '../../../store/actions';
import { selectCartItems } from '../../../store/reducers/cart/cartReselect';
import {selectTermsLang, selectLang}  from '../../../store/reducers/langReducer/langsReselect';
import LoadingScreen from '../../loadingScreen/loadingScreen.js' 
import { connect } from 'react-redux';

class CheckPayment extends Component {
  constructor(props) {
    super(props);
this.onSubmit = this.onSubmit.bind(this);
    this.state = {
      search: '',
      Loading: false,
      totalPrice:props.total,
      error:'', 
      placeOrderLoading: false, 
      voucher: {
        code:'',
        class: '',
        error: '',
        value: 0,
        inPercentage: false,
        used: false
      }
    }
  }

  async sendOrder(cartitems, token) {
    this.setState({placeOrderLoading:true}) 
    const { MakeOrder, clearCart } = this.props
    const data = {
products : cartitems, 
voucherUsed: this.state.voucher.used, 
voucherCode: this.state.voucher.code

} 

try {
  const response =   await axios.post('/api/order/add' , data, {
   headers : { Authorization: `Bearer ${token}`
    }} );
 console.log("order done"+ response.data.order);
 clearCart()
 this.setState({placeOrderLoading:false}) 
 this.props.history.push(/orderpage-user/ + response.data.order._id)
 console.log("sendPrder");
     
   } catch(err) {
   	this.setState({placeOrderLoading:false}) 
   	if (this.props.lang== 'en' ) {
this.setState({error: err.response.data.error}) 
} else if (this.props.lang== 'ar' ) {
	this.setState({error: err.response.data.error_ar}) 
	
	} 
   	
   }






    //await MakeOrder(data, token)
    
  }

  async onSubmit(formData) {

   // const response = Calls.postDataHeaderAuth("/api/voucher/verify",formData,this.props.token)
    formData.orderValue = 499
    try{
 const response = await Calls.postDataHeaderAuth("/api/voucher/verify",formData,{token: "3333"})
 console.log("onsubmit"+response.data.value + response.data.inPercentage );
 if(!response.data.inPercentage) {

this.setState({totalPrice: this.props.total-response.data.value ,voucher:{used:true , class:"beforePrice" ,code:response.data.code} } ) 
} 

if(response.data.inPercentage) {

this.setState({totalPrice: this.props.total*response.data.value ,voucher:{used:true , class:"beforePrice" ,code:response.data.code} } ) 
} 
} catch (e) {
  //I will implement error eng or Arabic later
  console.log("error:"+ e.response.data.error);
  if(this.props.lang==='ar') {
this.setState({voucher:{ error: e.response.data.error_ar}} ) 
} else if (this.props.lang==='en') {

this.setState({voucher:{ error: e.response.data.error}})
}  
// this.setState({error: e.response.data.error}) 
} 
    //  const { signIn } = this.props;
    //   await signIn(formData);
  

  }
  fieldsets = [

    {
      type: "text",
      name: "code",
      ID: "code",
      className: this.props.classN,
      placeholder: "promocode",
      label: "promocode"
    }



  ]
  authLeft(){

  }

    async componentDidMount() {
    await this.props.fetchCart(null,
      this.props.token,
      this.props.isAuthenticated)
     console.log("carts" +JSON.stringify( this.props.filteredCart));

   }
  render() {

    




    return (
      <div className="checkoutPayment-container">

        <h4>Confirm Order / payment on arrival  </h4>

        {this.props.filteredCart.map(item => (


          <div className="cart-Item" >

            <div className="cart-item-desc">
              <img alt={item.nameEn} src={"https://juvkhaled.s3-us-west-1.amazonaws.com/productsimgs/" + item.imgURLs[0].imgURL} className="cart-item-img" />
              <div className="cart-item-details">
                <p className="cart-item-title margin0">{item.nameEn} </p>
                <p className="cart-item-price margin0">X {item.quantity}</p>
                <p className="cart-item-price margin0">   EGP   {item.price}  </p>
              </div>{/* end of cart-utem-details*/}
            </div>{/* end of cart-item-desc*/}





            {/*cart-item */}
          </div>
        ))}







        <p className={"total-sum-cart " +this.state.voucher.class } >Total Order : {this.props.total+ " EGP"}</p>
        {this.state.voucher.used? <p className="total-sum-cart" >Price after Discount : {this.state.totalPrice+ " EGP" + " / promocode " + this.state.voucher.code + " applied"}</p> : null }
      <div className="main-container-auth">
        {!this.state.voucher.used ?
        <Form
        title={this.props.signin_title}
        fieldsets={this.fieldsets}
        classN="juv-input-form-set"
        labelClass="input-label"
        
        onSubmit={this.onSubmit}
        errorMsg={this.state.voucher.error}
      
        submitBtnTitle="Apply Promocode"
        
        removeErr={this.authLeft}
        LoadingBtn={this.props.Loading}
      /> : null
        }
        
</div>
        <table className="TableList" >
          <tr><td>Name:</td><td>{this.props.defaultAddress.firstName} </td></tr>
          <tr><td>Street:</td><td>{this.props.defaultAddress.fullAddress} </td></tr>
          <tr><td>City:</td><td>{this.props.defaultAddress.city} </td></tr>
          <tr><td>Phone:</td><td>{this.props.defaultAddress.phone} </td></tr>
        </table>

{this.state.error? <div className="errorMsg">{this.state.error}</div> : null}

{!this.state.placeOrderLoading ?
            <button onClick={async () => { await this.sendOrder(this.props.filteredCart, this.props.token); }} className="custum-btn-form" >Confirm Order</button>
            : <LoadingScreen />}


        
        <div className="checkout-cart-footer">





        </div>
      </div>

    );

  }





}

const mapStateToProps = (state) => {
  return {
  	isAuthenticated: state.userAuth.authUser.isAuthenticated,
  	filteredCart: state.cartProductsReducer.filteredCart,
  	lang: selectLang(state), 
    token: state.userAuth.authUser.token,
    total: state.cartProductsReducer.totalPrice,
    cartItems: selectCartItems(state),
    defaultAddress: state.addressReducer.default

  }
}

export default connect(mapStateToProps, actions)(CheckPayment);