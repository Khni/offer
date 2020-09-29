import React, {Component} from 'react'
//import {selectAdminAuth} from  '../../../../../store/reducers/admin/auth/adminReselect';
import { Route, NavLink, Switch, Redirect} from 'react-router-dom';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import * as RouterDom from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
//import AddproductStyle from './addProduct.scss'
//import InputForm from '../../../../components/form/inputAdminForm' 
//import SelectForm from '../../../../components/form/selectOptions.component' 
//import AddProduct from '../addItemToServer/addProduct.component'
//import ProductsList from '../TableList/productsList.component'
import TopNavStyle from '../../../../TopNav/TopNavStyle.scss'
import TopNavComponent from '../../../../TopNav/TopNav.component'
import * as actions from '../../../../../store/actions/users';


class UserOrders extends Component {

    constructor(props) {
        super(props)
        
    }




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
      
 <h3>Orders</h3>
<div>
 


                      <table className="TableList">
    <tr><th>Price</th><th>Order ID</th> </tr>
   
{this.props.orders.map((order)=>{
return     <tr><td>{order.totalPrice}</td><td>{order._id}</td></tr>
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