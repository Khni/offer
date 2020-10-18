import Style from './signIn.css';
import { withRouter } from 'react-router-dom';
import * as RouterDom from 'react-router-dom';
import Googleicon from './img/googleicon.png';
import FacebookIcon from './img/Facebookicon.png';
import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import { compose } from 'redux';
import {selectAuthLang} from  '../../../store/reducers/langReducer/langReselect';
//import * as actions from '../../../store/actions/users.js';
import * as actions from '../../../store/actions/userActions.js';
import GoogleLogin from 'react-google-login';
import FacebookLogin from 'react-facebook-login';
import { Link } from 'react-router-dom';
import Form from '../../form/form.component';
class signIn extends Component {

  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
   
    this.responseGoogle = this.responseGoogle.bind(this);
    this.responseFacebook = this.responseFacebook.bind(this);

  }
componentDidMount(){
  if (this.props.isAuthenticated && !this.props.errorMsg && this.props.token ) {
	
      this.props.history.push('/');
      
    }
}
  async onSubmit(formData) {


  //  const { signIn } = this.props;
 //   await signIn(formData);
 this.props.signInAuth(formData,"login")
if (this.props.isAuthenticated && !this.props.errorMsg && this.props.token ) {
	
      this.props.history.push('/');
      
    }
  }


  async responseGoogle(res) {
  //  await this.props.oauthGoogle(res.accessToken);
    if (this.props.isAuthenticated && !this.props.errorMsg && this.props.token) {
      this.props.history.push('/');
    }
  }

  async responseFacebook(res) {
 //   await this.props.oauthFacebook(res.accessToken);
    if (!this.props.errorMsg) {
      this.props.history.push('/');
    }
  }

  
  
fieldsets = [

 {
               type: "text" ,
                name:"email" ,
                ID :"email" ,
                className: this.props.classN ,
                placeholder: this.props.emailString ,
                label: this.props.emailString 
}, 
{
                type: "password" ,
                name:"password" ,
                ID :"password" ,
                className: this.props.classN ,
                placeholder:this.props.passwordString  ,
                label: this.props.passwordString
}



] 


  render() {
    const { handleSubmit } = this.props;
    return (

      <div class="main-container-signin">
   <Form
   title={this.props.signin_title} 
   fieldsets={this.fieldsets}
   classN="juv-input-form-set"
   labelClass="input-label"
   social={true}
   onSubmit={this.onSubmit } 
   errorMsg= {this.props.errorMsg} 
   fbres={this.responseFacebook} 
   googleres={this.responseGoogle}
   submitBtnTitle={this.props.submit_signin_btn} 
   signin={true} 
   signupLink="/signup" 
   ToSignUp={this.props.ToSignUp}
   signup_title={this.props.signup_title} 
   />
      </div>




    );
  }
}

const mapStateToProps = state => {
  return {
    errorMsg: state.userAuth.authUser.error, 
    name: state.userAuth.authUser.name, 
    token: state.userAuth.authUser.token,
    isAuthenticated: state.userAuth.authUser.isAuthenticated, 
    submit_signin_btn :selectAuthLang(state).submit_signin_btn, 
    signin_title: selectAuthLang(state).signin_title, 
    emailString:selectAuthLang(state).email, 
    passwordString: selectAuthLang(state).password, 
    classN: selectAuthLang(state).classN, 
    ToSignUp: selectAuthLang(state).ToSignUp, 
    signup_title :selectAuthLang(state).signup_title
  }

}

const mapDispatchToProps = dispatch => {
    return {
        signInAuth: ( data,action) => dispatch( actions.auth( data,action) ),
      //  onSetAuthRedirectPath: () => dispatch( actions.setAuthRedirectPath( '/' ) )
    };
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  reduxForm({ form: 'signin' })
)(signIn)