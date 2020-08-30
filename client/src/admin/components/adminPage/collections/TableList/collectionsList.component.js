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





class CollectionsList extends Component {

    constructor(props) {
        super(props)
        
    }

    async FetchCollectionsFromServer(){
      if(!this.props.collectionsFetched) {
   
        const { fetchCollections } = this.props;
      
        await fetchCollections();

          console.log("log from add product Update" )
         }
      
     
     }
   
       
  

async componentDidMount() {

await this.FetchCollectionsFromServer()
  console.log("log from  collection mound" )

  }
  async componentDidUpdate() {
    await this.FetchCollectionsFromServer()
    console.log("log from  collection Update" )
   }





    render() {


        return(


          <div className="TableList-container">
      
 <div>Product List</div>
  <div>
    <table className="TableList">
    <tr><th>collection name</th></tr>
   
{this.props.collections.map((collection)=>{
return     <tr><td>{collection.nameEn}</td></tr>
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
  collections: state.categoryReducer.collections, 
  AdminToken: selectAdminAuth(state).token,
  AddedToServer : state.categoryReducer.AddToServer.added,
  collectionsFetched: state.categoryReducer.collectionsFetched
 //   Name: selectAdminAuth(state).Name,
   // Email: selectAdminAuth(state).Email,
//state.adminAuth.error
    
  }

}



export default  connect(mapStateToProps, actions)(CollectionsList);