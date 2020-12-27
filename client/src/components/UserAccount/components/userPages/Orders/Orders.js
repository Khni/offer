import React, {Component} from 'react'
//import {selectAdminAuth} from  '../../../../../store/reducers/admin/auth/adminReselect';

import { connect } from 'react-redux';

//import AddproductStyle from './addProduct.scss'
//import InputForm from '../../../../components/form/inputAdminForm' 
//import SelectForm from '../../../../components/form/selectOptions.component' 
//import AddProduct from '../addItemToServer/addProduct.component'
//import ProductsList from '../TableList/productsList.component'
import  '../../../../TopNav/TopNavStyle.scss'
import '../../../../TopNav/TopNav.component'
import * as actions from '../../../../../store/actions/users';
import Head from '../../../../headd/header/header'

class UserOrders extends Component {

    // constructor(props) {
    //     super(props)
        
    // }




async FetchOrdersFromServer() {
   // if (!this.props.productsFetched) {

      const { FetchOrders } = this.props;
      
      await FetchOrders(this.props.token);

 //   }
    console.log("log from add product Updatefetchproduct")

  }
  

async componentDidMount() {
await this.FetchOrdersFromServer()
  }
  


    render() {

      
        return(


 <div className="TableList-container">
      <Head />
 
<div className="checkoutAddresses-container" >
 <h3>Orders</h3>


                      <table className="TableList">
    <tr><th>Price</th><th>Order ID</th> <th>status</th> </tr>
   
{this.props.orders.map((order)=>{
return     <tr onClick={() => this.props.history.push(/orderpage-user/+order._id) }><td>{order.totalPrice}</td><td>{order.orderNum}</td><td>{order.status}</td></tr>
   })}
  
      </table>  

            


   
      </div>
      
</div>




         
        )
    }
}

const mapStateToProps = state => {
  return {
  	errorMsg: state.userAuth.authUser.error, 
    name: state.userAuth.authUser.name, 
    token: state.userAuth.authUser.token,
    orders: state.ordersReducer.orders,
    isAuthenticated: state.userAuth.authUser.isAuthenticated
    
  }

}



export default  connect(mapStateToProps, actions)(UserOrders);