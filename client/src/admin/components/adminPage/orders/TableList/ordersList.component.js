import React, { Component } from 'react'
import { selectAdminAuth } from '../../../../../store/reducers/admin/auth/adminReselect';

import { connect } from 'react-redux';

import { withRouter } from 'react-router-dom';


//import AddProduct from './addProduct.component'
import * as actions from '../../../../../store/actions/ordersAdmin';
import '../../../../../components/TableList/TableList.scss'





class CategoryList extends Component {

  constructor(props) {
    super(props)
    this.state = {
      Loading: false,
      update: true,
      status: ''
    }
  }



  orderStatus = '';
  async FetchCategoriesFromServer() {

    if (!this.state.Loading) {
      //this if statment to prevent infinity loop in componentdidupdate
      this.setState({ Loading: true })
    }

    const { fetchAllOrders } = this.props;
    await fetchAllOrders(this.props.AdminToken, this.props.match.params.status);
    this.setState({ Loading: false, status: this.props.match.params.status })


  }

  async componentDidMount() {
    await this.FetchCategoriesFromServer()
  }




  async componentDidUpdate(prevProps, prevState) {

    if (this.state.status !== this.props.match.params.status) {
      console.log("statusbeforeset" + this.state.status);
      await this.FetchCategoriesFromServer()

      console.log("statusafterset" + this.state.status);

    }


  }




  render() {


    return (


      <div className="TableList-container">

        <h3>{this.props.match.params.status}</h3>
        <div>


          {!this.state.Loading ?
            <table className="TableList">
              <tr><td> </td><th>Order Number</th> <th>Total</th></tr>
              {/* onClick={() => this.props.history.push(`${this.props.match.url+"orderpage-admin/" }${orders._id}`)} */}
              {this.props.orders.map((orders, i) => {
                return <tr onClick={() => this.props.history.push(/orderpage-admin/ + orders._id)}>
                  <td>{i + 1}</td><td>{orders.createdAt}</td><td>{orders.orderNum}</td><td>{orders.totalPrice}</td></tr>
              })}

            </table> : <div className="loader" />}





        </div>

      </div>




    )
  }
}

const mapStateToProps = state => {
  return {
    orders: state.OrdersAdminReducer.orders,
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




export default withRouter(connect(mapStateToProps, actions)(CategoryList));