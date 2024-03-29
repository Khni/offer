import React, {Component} from 'react'
import SignUp from '../sign-up/signUp.js';
import SignIn from '../sign-in/signIn.js';
import { Route,  Switch, Redirect} from 'react-router-dom';
import { connect } from 'react-redux';

import Head from '../../headd/header/header'

import {selectTermsLang, selectLang}  from '../../../store/reducers/langReducer/langsReselect';



import  '../../TopNav/TopNavStyle.scss'
import TopNavComponent from '../../TopNav/TopNav.component'







class AuthNavPage extends Component {

    // constructor(props) {
    //     super(props)
        
    // }







  //  targetUrl () {
  //     // if(this.props.location.state) {
  //     //     	if(this.props.location.state.targetUrl) {
  //     // return this.props.location.state.targetUrl
  //     // } 
      
  //     //        } 
  //            return "link"
             
  //     } 

    render() {
    	
   



      const navlinks = [{
        path:"/authnav/login" ,
        title: this.props.terms.signin_title, 
        
      },
      {
        path:"/authnav/signup",
        title: this.props.terms.signup_title, 
        
      }]
        return(


     <div className="TopNavPage">
       <div className="header-container"><Head /></div>

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



function mapStateToProps(state) {
  return {
  	lang: selectLang(state), 
  terms: selectTermsLang(state),
  }
}

 
export default connect(mapStateToProps)(AuthNavPage);