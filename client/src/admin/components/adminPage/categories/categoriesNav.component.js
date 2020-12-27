import React, {Component} from 'react'
import {selectAdminAuth} from  '../../../../store/reducers/admin/auth/adminReselect';
import { Route,  Switch, Redirect} from 'react-router-dom';
import { connect } from 'react-redux';

//import AddcategoriesStyle from './addCategory.scss'
 
import AddCategory from './addCategory.component'
import CategoriesList from './categoriesList.component'

import * as actions from '../../../../store/actions/product';
import  '../../../../components/TopNav/TopNavStyle.scss'
import TopNavComponent from '../../../../components/TopNav/TopNav.component'







class CategoriesNav extends Component {

    // constructor(props) {
    //     super(props)
        
    // }









    render() {

      const navlinks = [{
        path: "/admin/categories/categories-list",
        title: "Categories List"
      },
      {
        path: "/admin/categories/add-category",
        title: "Add Category"
      }]
        return(


     <div className="TopNavPage">
       <TopNavComponent navlinksArr={navlinks} />
      
 

    

      <div className="TopNav-container">
                <Switch>
                    
                    <Route exact path="/admin/categories/add-category" component={AddCategory}  />
                    <Route exact path="/admin/categories/categories-list" component={CategoriesList}  />
                         <Redirect from="/admin/categories" to="/admin/categories/categories-list" />
                   
                   
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



export default  connect(mapStateToProps, actions)(CategoriesNav);