import React, {Component} from 'react'
import {selectAdminAuth} from  '../../../../../store/reducers/admin/auth/adminReselect';
import { Route,  Switch, Redirect} from 'react-router-dom';
import { connect } from 'react-redux';

//import AddproductStyle from './addProduct.scss'
//import InputForm from '../../../../components/form/inputAdminForm' 
//import SelectForm from '../../../../components/form/selectOptions.component' 
import AddSection from '../addSection.component'
import SectionsList from '../TableList/sectionsList.component'

import * as actions from '../../../../../store/actions/product';
import  '../../../../../components/TopNav/TopNavStyle.scss'
import TopNavComponent from '../../../../../components/TopNav/TopNav.component'




class SectionsNav extends Component {

    // constructor(props) {
    //     super(props)
        
    // }









    render() {

      const navlinks = [{
        path: "/admin/sections/sections-list",
        title: "sections List"
      },
      {
        path: "/admin/sections/add-section",
        title: "Add Section"
      }]
        return(


     <div className="TopNavPage">
       <TopNavComponent navlinksArr={navlinks} />
      
 

    

      <div className="TopNav-container">
                <Switch>
                    
                    <Route exact path="/admin/sections/add-section" component={AddSection}  />
                    <Route exact path="/admin/sections/sections-list" component={SectionsList}  />
                         <Redirect from="/admin/sections" to="/admin/sections/sections-list" />
                   
                   
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



export default  connect(mapStateToProps, actions)(SectionsNav);