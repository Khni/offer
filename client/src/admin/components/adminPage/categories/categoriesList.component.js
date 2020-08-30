import React, {Component} from 'react'
import {selectAdminAuth} from  '../../../../store/reducers/admin/auth/adminReselect';
import { Route, NavLink, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import * as RouterDom from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
//import AddproductStyle from './addProduct.scss'
import InputForm from '../../../../components/form/inputAdminForm' 
import SelectForm from '../../../../components/form/selectOptions.component' 
//import AddProduct from './addProduct.component'
import * as actions from '../../../../store/actions/product';
import TableStyle from './TableList.scss'




class CategoryList extends Component {

    constructor(props) {
        super(props)
        
    }

    async FetchCategoriesFromServer(){
      if(!this.props.categoriesFetched) {
   
     const { fetchCategories } = this.props;
     await fetchCategories();
     
     }
     console.log("log from add product Updatefetchproduct" )
       
   }

async componentDidMount() {
await this.FetchCategoriesFromServer()
  }
  async componentDidUpdate() {
 await this.FetchCategoriesFromServer()
   }





    render() {


        return(


     <div className="TableList-container">
      
 <div>Categories List</div>
<div>
    <table className="TableList">
    <tr><th>Category Name</th> </tr>
   
{this.props.categories.map((category)=>{
return     <tr><td>{category.nameEn}</td></tr>
   })}
  
      </table>
      </div>
      
</div>



         
        )
    }
}

const mapStateToProps = state => {
  return {
  	categories : state.categoryReducer.categories,
 // sections: state.categoryReducer.sections, 
  categoriesFetched: state.categoryReducer.categoriesFetched
 // AdminToken: selectAdminAuth(state).token,
  //AddedToServer : state.categoryReducer.AddToServer.added,
 // products: state.categoryReducer.products
 //   Name: selectAdminAuth(state).Name,
   // Email: selectAdminAuth(state).Email,
//state.adminAuth.error
    
  }

}



export default  connect(mapStateToProps, actions)(CategoryList);