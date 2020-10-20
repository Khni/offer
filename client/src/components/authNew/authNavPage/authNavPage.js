import React, {Component} from 'react'
import SignUp from '../sign-up/signUp.js';
import SignIn from '../sign-in/signIn.js';
import { Route, NavLink, Switch, Redirect} from 'react-router-dom';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import * as RouterDom from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import Head from '../../headd/header/header'




import TopNavStyle from '../../TopNav/TopNavStyle.scss'
import TopNavComponent from '../../TopNav/TopNav.component'







class AuthNavPage extends Component {

    constructor(props) {
        super(props)
        
    }









    render() {

      const navlinks = [{
        path:"/authnav/login" ,
        title: "Login"
      },
      {
        path:"/authnav/signup",
        title: "Sign up"
      }]
        return(


     <div className="TopNavPage">
<Head />
<h5>Login or Sign up</h5>
       
       <TopNavComponent navlinksArr={navlinks} />
      
 

    

      <div className="TopNav-container">
                <Switch>
                    
                    <Route exact path="/authnav/login"  component={SignIn}  />
                    <Route exact path="/authnav/signup" component={SignUp}  />
                         <Redirect from="/authnav" to="/authnav/login"  />
                   
                   
                </Switch>
    </div>
</div>



         
        )
    }
}





export default  AuthNavPage