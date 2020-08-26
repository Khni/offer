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
import TableListStyle from './TableList.scss"





class CollectionsList extends Component {

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
    const { fetchCollections } = this.props;
  const { fetchProducts } = this.props;
  await fetchCollections();
  await fetchProducts();
    console.log("log from add product Update" )
   }





    render() {


        return(


          <div className="TableList-container">
      
 <div>Product List</div>

    <table className="TableList">
    <tr><th>collection name</th></tr>
   
{this.props.collections.map((collection)=>{
return     <tr><td>{collection.nameEn}</td></tr>
   })}
  
      </table>

   
</div>



         
        )
    }
}

const mapStateToProps = state => {
  return {
  	//categories : state.categoryReducer.categories, 
  collections: state.categoryReducer.collections, 
  AdminToken: selectAdminAuth(state).token,
  AddedToServer : state.categoryReducer.AddToServer.added,
  products: state.categoryReducer.products
 //   Name: selectAdminAuth(state).Name,
   // Email: selectAdminAuth(state).Email,
//state.adminAuth.error
    
  }

}



export default  connect(mapStateToProps, actions)(CollectionsList);