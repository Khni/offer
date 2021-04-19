import React, { Component } from 'react'
import { selectAdminAuth } from '../../../../../store/reducers/admin/auth/adminReselect';

import * as actions from '../../../../../store/actions/product';
import { Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

//import AddproductStyle from './addProduct.scss'

import AddCollection from '../addItemToServer/addCollection.component'
import CollectionsList from '../TableList/collectionsList.component'

import '../../../../../components/TopNav/TopNavStyle.scss'
import TopNavComponent from '../../../../../components/TopNav/TopNav.component'






class ProductsNav extends Component {

  // constructor(props) {
  //     super(props)

  // }









  render() {

    const navlinks = [{
      path: "/admin/collections/collections-list",
      title: "Collections List"
    },
    {
      path: "/admin/collections/add-collection",
      title: "Add Collection"
    }]
    return (


      <div className="TopNavPage">
        <TopNavComponent navlinksArr={navlinks} />





        <div className="TopNav-container">
          <Switch>

            <Route exact path="/admin/collections/add-collection" component={AddCollection} />
            <Route exact path="/admin/collections/collections-list" component={CollectionsList} />
            <Redirect from="/admin/collections" to="/admin/collections/collections-list" />


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
    AddedToServer: state.categoryReducer.AddToServer.added,
    products: state.categoryReducer.products
    //   Name: selectAdminAuth(state).Name,
    // Email: selectAdminAuth(state).Email,
    //state.adminAuth.error

  }

}



export default connect(mapStateToProps, actions)(ProductsNav);