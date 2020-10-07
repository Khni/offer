import React, {Component} from 'react'
import {selectAdminAuth} from  '../../../../../store/reducers/admin/auth/adminReselect';
import { Route, NavLink, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import * as RouterDom from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';

//import AddProduct from './addProduct.component'
import * as actions from '../../../../../store/actions/ordersAdmin';
import TableListStyle from '../../../../../components/TableList/TableList.scss'





class CategoryList extends Component {

    constructor(props) {
        super(props)
        this.state = {
          Loading: false,
          update: true,
          status: this.props.match.params.status
        }
    }

    async FetchCategoriesFromServer(){
   //   if(!this.props.categoriesFetched) {
   this.setState({Loading: true})
     const { fetchAllOrders } = this.props;
     await fetchAllOrders(this.props.AdminToken,this.props.match.params.status);
     this.setState({Loading: false})
    // }
     console.log("log from add product Updatefetchproduct" )
       
   }

async componentDidMount() {
await this.FetchCategoriesFromServer()
  }
//   async componentDidUpdate(prevProps, prevState) {
//     console.log("prevState:" + prevState.Loading);
//     if (!prevState.Loading) {
//  await this.FetchCategoriesFromServer()
//     }
  // }
async componentDidUpdate(prevState){
  if (prevState.status == this.state.status) {
    await this.FetchCategoriesFromServer()
  }
 // this.setState({update: false})
  
}




    render() {


        return(


     <div className="TableList-container">
      
 <h3>{this.props.match.params.status}</h3>
<div>
 

{!this.state.Loading?
                      <table className="TableList">
    <tr><td> </td><th>Order Number</th> <th>Total</th></tr>
   
{this.props.orders.map((orders,i)=>{
return     <tr><td>{i +1}</td><td>{orders.orderNum}</td><td>{orders.totalPrice}</td></tr>
   })}
  
      </table>:  <div className="loader"/>}

            


   
      </div>
      
</div>



         
        )
    }
}

const mapStateToProps = state => {
  return {
  	orders : state.OrdersAdminReducer.orders,
 // sections: state.categoryReducer.sections, 
  categoriesFetched: state.categoryReducer.categoriesFetched,
 AdminToken: selectAdminAuth(state).token
  //AddedToServer : state.categoryReducer.AddToServer.added,
 // products: state.categoryReducer.products
 //   Name: selectAdminAuth(state).Name,
   // Email: selectAdminAuth(state).Email,
//state.adminAuth.error
    
  }

}



export default  connect(mapStateToProps, actions)(CategoryList);