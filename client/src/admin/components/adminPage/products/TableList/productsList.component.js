import React, {Component} from 'react'
import {selectAdminAuth} from  '../../../../../store/reducers/admin/auth/adminReselect';
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
import TableListStyle from './TableList.scss'





class ProductsList extends Component {

    constructor(props) {
        super(props)
      
       this.state = {
          search : '' 

        } 
    }

    searchUpdate(event) {
   this.setState({search: event.target.value.substr(0,20)})
} 

async componentDidMount() {

  const { fetchSections } = this.props;
  const { fetchProducts } = this.props;
  await fetchSections();
  await fetchProducts();
  console.log("log from add product mound" )

  }
  async componentDidUpdate() {
    const { fetchSections } = this.props;
  const { fetchProducts } = this.props;
  await fetchSections();
  await fetchProducts();
    console.log("log from add product Update" )
   }





    render() {
let productsFiltered = this.props.products.filter((itemProduct)=>{
  return  itemProduct.nameEn.indexOf(this.state.search) !== -1
  } )

        return(


          <div className="TableList-container">
      
 <div>Product List</div>
 <input type='text' value={this.state.search} onChange={this.searchUpdate.bind(this)} />
<div >
    <table className="TableList" >
    <tr><th>product name</th> <th>Quantity </th> <th>Price </th></tr>
   
{productsFiltered.map((product)=>{
return     <tr><td>{product.nameEn}</td><td>{product.quantity }</td><td>{product.price }</td></tr>
   })}
  
      </table>
     </div>

   
</div>



         
        )
    }
}

const mapStateToProps = state => {
  return {
  	//categories : state.categoryReducer.categories, 
  sections: state.categoryReducer.sections, 
  AdminToken: selectAdminAuth(state).token,
  AddedToServer : state.categoryReducer.AddToServer.added,
  products: state.categoryReducer.products
 //   Name: selectAdminAuth(state).Name,
   // Email: selectAdminAuth(state).Email,
//state.adminAuth.error
    
  }

}



export default  connect(mapStateToProps, actions)(ProductsList);