import React, { Component } from 'react';
import './checkoutPayment.scss';
import Form from '../../form/form.component'
import * as Calls from '../../../store/actions/axiosCalls'
import * as actions from '../../../store/actions/users';
import { selectCartItems } from '../../../store/reducers/cart/cartReselect';
import {selectTermsLang, selectLang}  from '../../../store/reducers/langReducer/langsReselect';

import { connect } from 'react-redux';

class CheckPayment extends Component {
  constructor(props) {
    super(props);
this.onSubmit = this.onSubmit.bind(this);
    this.state = {
      search: '',
      Loading: false,
      totalPrice:props.total,
      voucher: {
        error: '',
        value: 0,
        inPercentage: false
      }
    }
  }

  async sendOrder(data, token) {
    const { MakeOrder, clearCart } = this.props
    await MakeOrder(data, token)
    clearCart()
    this.props.history.push('/orders')
    console.log("sendPrder");
  }

  async onSubmit(formData) {

   // const response = Calls.postDataHeaderAuth("/api/voucher/verify",formData,this.props.token)
    formData.orderValue = 499
    try{
 const response = await Calls.postDataHeaderAuth("/api/voucher/verify",formData,{token: "3333"})
 console.log("onsubmit"+response.data.value + response.data.inPercentage );
 if(!response.data.inPercentage) {

this.setState({totalPrice: this.props.total-response.data.value} ) 
} 
} catch (e) {
  //I will implement error eng or Arabic later
  console.log("error:"+ e.response.data.error);
  if(this.props.lang==='ar') {
this.setState({voucher:{error: e.response.data.error_ar}) 
} else if (this.props.lang==='en') {

this.setState({voucher:{error: e.response.data.error} })
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

  //   async componentDidMount() {
  //   await this.sendOrder()
  //   }
  render() {

    




    return (
      <div className="checkoutPayment-container">

        <h4>Confirm Order / payment on arrival  </h4>

        {this.props.cartItems.map(item => (


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







        <p className="total-sum-cart" >Total Order : {this.state.totalPrice+ " EGP"}</p>
      <div className="main-container-auth">
        <Form
          title={this.props.signin_title}
          fieldsets={this.fieldsets}
          classN="juv-input-form-set"
          labelClass="input-label"
          
          onSubmit={this.onSubmit}
          errorMsg={this.state.voucher.error}
        
          submitBtnTitle="USE"
          
          removeErr={this.authLeft}
          LoadingBtn={this.props.Loading}
        />
</div>
        <table >
          <tr><td>Name:</td><td>{this.props.defaultAddress.firstName} </td></tr>
          <tr><td>Street:</td><td>{this.props.defaultAddress.fullAddress} </td></tr>
          <tr><td>City:</td><td>{this.props.defaultAddress.city} </td></tr>
          <tr><td>Phone:</td><td>{this.props.defaultAddress.phone} </td></tr>
        </table>



        <button onClick={async () => { await this.sendOrder(this.props.cartItems, this.props.token); }} className="custum-btn-form-fixed" >Confirm Order</button>
        <div className="checkout-cart-footer">





        </div>
      </div>

    );

  }





}

const mapStateToProps = (state) => {
  return {
  	lang: selectLang(state), 
    token: state.userAuth.authUser.token,
    total: selectCartItems(state).reduce((accumalatedQuantity, item) => accumalatedQuantity + item.quantity * item.price, 0),
    cartItems: selectCartItems(state),
    defaultAddress: state.addressReducer.default

  }
}

export default connect(mapStateToProps, actions)(CheckPayment);