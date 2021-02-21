import React ,{Component} from 'react'
import axios from 'axios';


import {connect} from 'react-redux'
 




 class ProductPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
          order:'',
          Loading: true, 
          
          
        }
        
      }
      
      
      
async fetchOrder(){
 console.log("before response");
  const response =   await axios.get('/api/user/order/find/'+this.props.match.params.id  , {
    headers : { Authorization: `Bearer ${this.props.token}`
     }} );
     console.log("response orderuserpage" + response);
  this.setState({order:  response.data.order})
  
 
}




async componentDidMount(){
  console.log("mount user order page");
await this.fetchOrder()
this.setState({Loading: false})
}




      render(){
        console.log(this.props.match.params.id);
    

        return(

<div>

          {!this.state.Loading?   <div className="checkoutPayment-container">
		
        <h4>{"Order Status: " +this.state.order.status } </h4>
        <table className="TableList">
         <tr><th>Price</th><th>Quantity </th><th>Product</th> </tr>
         {this.state.order.products.map(item=>(

<tr><td>{item.price}</td><td>{item.quantity}</td><td>{item.nameEn}</td></tr>

))} 
     <tr><td>{this.state.order.totalPrice+ " EGP"}</td > <td colspan="2">Total</td></tr>    
    </table>     

  
  
  
  
  
  <table className="TableList" >
  <h3>Shipping Details</h3>
          <tr><td>Name:</td><td>{this.state.order.defaultAddress.firstName} </td></tr>
          <tr><td>Street:</td><td>{this.state.order.defaultAddress.fullAddress} </td></tr>
          <tr><td>City:</td><td>{this.state.order.defaultAddress.city} </td></tr>
          <tr><td>Phone:</td><td>{this.state.order.defaultAddress.phone} </td></tr>
        </table>
  
  
    
        


{/* <div className="cart-Item borderCard" > 

<p className="centerdiv">{this.props.defaultAddress.firstName +" "+ this.props.defaultAddress.lastName} </p>
    <p className="centerdiv">{this.props.defaultAddress.street} </p>
    <p className="centerdiv">{this.props.defaultAddress.city} </p>
    <p className="centerdiv">{this.props.defaultAddress.phone} </p>
    </div> */}
    
    {/* <button onClick={async()=>{await this.sendOrder(this.props.cartItems,this.props.token);} } className="custum-btn-form" >Confirm Order</button> */}
 
<div className="checkout-cart-footer">


   


</div>
       </div>: <div className="loaderHome"/> }
</div>
        );
      }
 }

 const mapStateToProps = (state, ownProps) => ({
  /*ItemProduct: state.ProductsReducer.products.find((col)=>{

    return col.id ===1
  })*/
  token: state.userAuth.authUser.token,
 // Item: state.ProductsReducer.products.flatMap((col)=>  col.items).find((item)=> item.id ==  ownProps.match.params.id )
 //Product: selectItem(ownProps.match.params.id)(state)
});





export default connect(mapStateToProps)(ProductPage);
