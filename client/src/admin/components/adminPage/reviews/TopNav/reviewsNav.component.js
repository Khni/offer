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
import AddProduct from '../addItemToServer/addProduct.component'
import List from '../TableList/reviewsList.component'
import TopNavStyle from '../../../../../components/TopNav/TopNavStyle.scss'
import TopNavComponent from '../../../../../components/TopNav/TopNav.component'
import * as actions from '../../../../../store/actions/product';





class ProductsNav extends Component {

    constructor(props) {
        super(props)
        
    }




componentDidMount() {
  console.log("reviewsComponent" + this.props.subRoute+'status' );
}




    render() {

     
        return(


     <div className="TopNavPage">
       <TopNavComponent navlinksArr={this.props.navlinks} />
      
 

    

      <div className="TopNav-container">
                <Switch>
                    
                
                <Route exact
  path={this.props.subRoute+'/:status' }
  render={(props) => (
    <List {...props} fetchList={this.props.fetchList} adminToken={this.props.adminToken} />
  )}
/>    


    
<Redirect from={this.props.mainRoute} to={this.props.redirectLink} />
                    
                   
                   
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



export default  connect(mapStateToProps, actions)(ProductsNav);