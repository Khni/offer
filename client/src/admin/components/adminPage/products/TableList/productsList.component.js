import React, { Component } from 'react'
import { selectAdminAuth } from '../../../../../store/reducers/admin/auth/adminReselect';
import { Route, NavLink, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import * as RouterDom from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
//import AddproductStyle from './addProduct.scss'
//import InputForm from '../../../../../components/form/inputAdminForm' 
//import SelectForm from '../../../../../components/form/selectOptions.component' 
//import AddProduct from './addProduct.component'
import * as actions from '../../../../../store/actions/product';
import TableListStyle from '../../../../../components/TableList/TableList.scss'





class ProductsList extends Component {

  constructor(props) {
    super(props)

    this.state = {
      search: ''
    }
  }

  searchUpdate(event) {
    this.setState({ search: event.target.value.substr(0, 20) })
  }
  async FetchProductsFromServer() {
    if (!this.props.productsFetched) {

      const { fetchProducts } = this.props;
      await fetchProducts();

    }
    console.log("log from add product Updatefetchproduct")

  }
  async componentDidMount() {

    await this.FetchProductsFromServer()
    console.log("log from list product mound")

  }
  async componentDidUpdate() {
    await this.FetchProductsFromServer()
    console.log("log from list product Update")
  }
  render() {
    let productsFiltered = this.props.products.filter((itemProduct) => {
      return itemProduct.nameEn.indexOf(this.state.search) !== -1
    })
    return (
      <div className="TableList-container">
        <div className="Tabel-Header">
          <h3>Products List</h3>
          <input className="input-search-tableList" type='text' value={this.state.search} onChange={this.searchUpdate.bind(this)} placeholder="search....." />
        </div>
        <div >
          <table className="TableList">
            <tr><th>product name</th> <th>Quantity</th> <th>Price</th></tr>
            
            {!this.props.productsIsFetching ?
                            {productsFiltered.map((product, i) => {
              return <tr key={i + 1}><td key={i + 2}>{product.nameEn}</td><td key={i + 3}>{product.quantity}</td><td key={i + 4}>{product.price}</td></tr>
            })}:  <div className="loader">}

            
           
            
            {productsFiltered.map((product, i) => {
              return <tr key={i + 1}><td key={i + 2}>{product.nameEn}</td><td key={i + 3}>{product.quantity}</td><td key={i + 4}>{product.price}</td></tr>
            })}
            
            
          </table>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    productsFetched: state.categoryReducer.productsFetched,
    productsIsFetching: state.categoryReducer.productsIsFetching,
    sectionsFetched: state.categoryReducer.sectionsFetched,

    sections: state.categoryReducer.sections,
    AdminToken: selectAdminAuth(state).token,
    AddedToServer: state.categoryReducer.AddToServer.added,
    products: state.categoryReducer.products
    //   Name: selectAdminAuth(state).Name,
    // Email: selectAdminAuth(state).Email,
    //state.adminAuth.error

  }

}



export default connect(mapStateToProps, actions)(ProductsList);