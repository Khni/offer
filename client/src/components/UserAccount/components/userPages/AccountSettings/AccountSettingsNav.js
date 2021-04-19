import React, {Component} from 'react'

import { Route,  Switch, Redirect} from 'react-router-dom';
import { connect } from 'react-redux';
// import { reduxForm, Field } from 'redux-form';
// import * as RouterDom from 'react-router-dom';
// import { withRouter } from 'react-router-dom';
// import { compose } from 'redux';
import Head from '../../../../headd/header/header'
import {selectTermsLang} from  '../../../../../store/reducers/langReducer/langsReselect';
import AccountSettings from './AccountSettings.js'
import Address from './addresses.js'


import  '../../../../TopNav/TopNavStyle.scss'
import TopNavComponent from '../../../../TopNav/TopNav.component'







class AccountSettingsNav extends Component {

    // constructor(props) {
    //     super(props)
        
    // }









    render() {

      const navlinks = [{
        path:"/settings/details" ,
        title: this.props.terms.details
      },
      {
        path:"/settings/address",
        title: this.props.terms.addresses
      }]
        return(


     <div className="TopNavPage">
       <div className="header-container"><Head /></div>


       <h5>Account Settings</h5>
       <TopNavComponent navlinksArr={navlinks} />
      
 

    

      <div className="TopNav-container">
                <Switch>
                    
                    <Route exact path="/settings/details"  component={AccountSettings}  />
                    <Route exact path="/settings/address" component={Address}  />
                         <Redirect from="/settings" to="/settings/details"  />
                   
                   
                </Switch>
    </div>
</div>



         
        )
    }
}


const mapStateToProps = state => {
  return {
    terms :selectTermsLang(state), 
//state.adminAuth.error
    
  }

}



export default connect(mapStateToProps)(AccountSettingsNav);
