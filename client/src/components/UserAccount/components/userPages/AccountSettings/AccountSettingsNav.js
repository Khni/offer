import React, {Component} from 'react'

import { Route, NavLink, Switch, Redirect} from 'react-router-dom';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import * as RouterDom from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';

import AccountSettings from './AccountSettings.js'
import Address from './addresses.js'


import TopNavStyle from '../../../../TopNav/TopNavStyle.scss'
import TopNavComponent from '../../../../TopNav/TopNav.component'







class AccountSettingsNav extends Component {

    constructor(props) {
        super(props)
        
    }









    render() {

      const navlinks = [{
        path:"/account/settings/details" ,
        title: "Details"
      },
      {
        path:"/account/settings/address",
        title: "Address"
      }]
        return(


     <div className="TopNavPage">


       <h5>Account Settings</h5>
       <TopNavComponent navlinksArr={navlinks} />
      
 

    

      <div className="TopNav-container">
                <Switch>
                    
                    <Route exact path="/account/settings/details"  component={AccountSettings}  />
                    <Route exact path="/account/settings/address" component={Address}  />
                         <Redirect from="/account/settings" to="/account/settings/details"  />
                   
                   
                </Switch>
    </div>
</div>



         
        )
    }
}





export default  AccountSettingsNav