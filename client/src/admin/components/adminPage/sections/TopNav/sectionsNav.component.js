import React, {Component} from 'react'
import {selectAdminAuth} from  '../../../../../store/reducers/admin/auth/adminReselect';
import { Route, NavLink, Switch, Redirect} from 'react-router-dom';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import * as RouterDom from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
//import AddproductStyle from './addProduct.scss'
//import InputForm from '../../../../components/form/inputAdminForm' 
//import SelectForm from '../../../../components/form/selectOptions.component' 
import AddSection from '../addSection.component'
import SectionsList from '../TableList/sectionsList.component'
import SectionsNavStyle from './sectionsNavStyle.scss'
import * as actions from '../../../../../store/actions/product';





class SectionsNav extends Component {

    constructor(props) {
        super(props)
        
    }









    render() {


        return(


     <div className="TopNav">
       <nav className="items-nav">
    
                            
                            
                    <NavLink className="NavLinkItems"  to={{
    pathname: "/admin/sections/sections-list"
}}
activeClassName="my-active"
    activeStyle={{
      //  color: '#fa923f',
       // textDecoration: 'underline'
       background: "#0083B0",
       color: "#ffffff"

    }}
>Sections List</NavLink>

                             
                            
    <NavLink className="NavLinkItems"
    to="/admin/sections/add-section"
    exact
    activeClassName="my-active"
    activeStyle={{
      //  color: '#fa923f',
      //  textDecoration: 'underline',
      background: "#0083B0",
      color: "#ffffff"
    }}>Add Section</NavLink>
   



</nav>
 

    

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