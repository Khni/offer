import React, {Component} from 'react'
import {selectAdminAuth} from  '../../../../store/reducers/admin/auth/adminReselect';
import { Route, NavLink, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import * as RouterDom from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import AddproductStyle from './addProduct.scss'
import InputForm from '../../../../components/form/inputAdminForm' 
import SelectForm from '../../../../components/form/selectOptions.component' 
import AddProduct from './addProduct.component'
import * as actions from '../../../../store/actions/product';





class ProductsList extends Component {

    constructor(props) {
        super(props)
        
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


        return(


     <div className="productsList">
      
 <div>Product List</div>

    <table className="productsList-table">
    <tr><th>product name</th> <th>Quantity </th> <th>Price </th></tr>
   
{this.props.products.map((product)=>{
return     <tr><td>{product.nameEn}</td><td>{product.quantity }</td><td>{product.price }</td></tr>
   })}
  
      </table>

      <div className="products-nav-container">
                <Switch>
                    
                    <Route exact path="/admin/products/add-product" component={AddProduct}  />
                   
                   
                </Switch>
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