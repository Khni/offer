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
import TableListStyle from '../../../../../components/TableList/TableList.scss'





class ProductsList extends Component {

    constructor(props) {
        super(props)
        
    }


async FetchSectionsFromServer() {
if(!this.props.sectionsFetched) {
  
  const { fetchSections } = this.props;
  await fetchSections();
  console.log("log from add product UpdatefetchSectction" )
  }
} 


async componentDidMount() {

 await this.FetchSectionsFromServer()
  console.log("log from add product mound" )

  }
  async componentDidUpdate() {
    await this.FetchSectionsFromServer()
    console.log("log from add product Update" )
   }





    render() {


        return(


          <div className="TableList-container">
      
 <h3>Sections List</h3>
<div >
    <table className="TableList" >
    <tr><th>sections name</th></tr>
   
{this.props.sections.map((section)=>{
return     <tr><td>{section.nameEn}</td></tr>
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
  sectionsFetched: state.categoryReducer.sectionsFetched
 //   Name: selectAdminAuth(state).Name,
   // Email: selectAdminAuth(state).Email,
//state.adminAuth.error
    
  }

}



export default  connect(mapStateToProps, actions)(ProductsList);