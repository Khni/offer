import React, {Component} from 'react'
import {selectAdminAuth} from  '../../../../../store/reducers/admin/auth/adminReselect';

import { connect } from 'react-redux';

//import AddproductStyle from './addProduct.scss'
//import InputForm from '../../../../../components/form/inputAdminForm' 
//import SelectForm from '../../../../../components/form/selectOptions.component' 
//import AddProduct from './addProduct.component'
import * as actions from '../../../../../store/actions/product';
import  '../../../../../components/TableList/TableList.scss'





class CollectionsList extends Component {

    constructor(props) {
        super(props)
        this.state = {
          Loading: false
        }
        
    }

    async FetchCollectionsFromServer(){
      if(!this.props.collectionsFetched) {
   this.setState({Loading: true})
        const { fetchCollections } = this.props;
      
        await fetchCollections();
this.setState({Loading: false})
          console.log("log from add product Update" )
         }
      
     
     }
   
       
  

async componentDidMount(prevProps, prevState) {
 // console.log("prevState:" + prevState.Loading);
await this.FetchCollectionsFromServer()
  console.log("log from  collection mound" )

  }
  async componentDidUpdate(prevProps, prevState) {
    console.log("prevState:" + prevState.Loading);
    if (!prevState.Loading) {
      await this.FetchCollectionsFromServer()
    console.log("log from  collection Update" )
    }
    
   }





    render() {


        return(


          <div className="TableList-container">
      
 <h3>Collection List</h3>
  <div>
  {!this.state.Loading?
                      <table className="TableList">
    <tr><th>collection name</th></tr>
   
{this.props.collections.map((collection)=>{
return     <tr><td>{collection.nameEn}</td></tr>
   })}
  
      </table>:  <div className="loader"/>}

  
 
    
      
      
      
      
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