import React, { Component } from 'react'
import { selectAdminAuth } from '../../../../../store/reducers/admin/auth/adminReselect';
import { Route, NavLink, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import * as RouterDom from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import axios from 'axios'
//import AddProduct from './addProduct.component'
import * as actions from '../../../../../store/actions/ordersAdmin';
import TableListStyle from '../../../../../components/TableList/TableList.scss'





class CategoryList extends Component {

  constructor(props) {
    super(props)
    this.state = {
      list: [],
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



    const list = await this.props.fetchList(this.props.match.params.status, this.props.adminToken)
    this.setState({ list: list, Loading: false, status: this.props.match.params.status })








  }

  async active(action, token, id) {
    if (!this.state.Loading) {
      //this if statment to prevent infinity loop in componentdidupdate
      this.setState({ Loading: true })
    }
    let url = ''
    if (action) {
     url = '/api/review-activate/'
    }else{
      url = '/api/review-deactivate/'
    }
    try {
     const response =   await axios.get(url +id, {
      headers : { Authorization: `Bearer ${token}` } });
 
      const list = await this.props.fetchList(this.props.match.params.status, this.props.adminToken)
      this.setState({ list: list, Loading: false, status: this.props.match.params.status })
  
      } catch(err) {
     console.log(err);
          
      }
    }


  async componentDidMount() {
    console.log("log from review list " + this.props.Ato);
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


        <div>


          {!this.state.Loading ?
            <table className="TableList">
              <tr><td> </td><th>rate</th> <th>title</th> <th>comment</th> </tr>
              {/* onClick={() => this.props.history.push(`${this.props.match.url+"orderpage-admin/" }${orders._id}`)} */}
              {this.state.list.map((item, i) => {
                return <tr>
                  <td>{i + 1}</td><td>{item.rate}</td><td>{item.title}</td><td>{item.comment}</td>
                  {this.props.match.params.status == "notactive" ?
                     <td><button className="customBtn" onClick={() => this.active(true,this.props.AdminToken,item._id)}>ACTIVATE</button></td>
                    : <td><button className="customBtn" onClick={() => this.active(false,this.props.AdminToken,item._id)}>DEACTIVATE</button></td>
                  }




                </tr>
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