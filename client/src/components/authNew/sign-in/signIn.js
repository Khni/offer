import Style from './signIn.css';
import { withRouter } from 'react-router-dom';
import * as RouterDom from 'react-router-dom';
import Googleicon from './img/googleicon.png';
import FacebookIcon from './img/Facebookicon.png';
import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import { compose } from 'redux';

import * as actions from '../../../store/actions/users.js';
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

  async onSubmit(formData) {


    const { signUp } = this.props;
    await signUp(formData);
if (!this.props.errorMsg) {
    this.props.history.push('/dashboard')
} 
  }


  async responseGoogle(res) {
    await this.props.oauthGoogle(res.accessToken);
    if (!this.props.errorMsg) {
      this.props.history.push('/');
    }
  }

  async responseFacebook(res) {
    await this.props.oauthFacebook(res.accessToken);
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

      <div class="main-container-signup">
   <Form
   title={this.props.signin_title} 
   fieldsets={this.fieldsets}
   social={true}
   onSubmit={this.onSubmit } 
   errorMsg= {this.props.errorMsg} 
   fbres={this.responseFacebook} 
   googleres={this.responseGoogle}
   submitBtnTitle={this.props.submit_signin_btn} 
   />
      </div>




    );
  }
}

const mapStateToProps = state => {
  return {
    errorMsg: state.userAuth.error, 
    submit_signin_btn :state.langReducer.auth.submit_signin_btn, 
    signin_title: state.langReducer.auth.signin_title, 
    emailString:state.langReducer.auth.email, 
    passwordString: state.langReducer.auth.password, 
    classN: state.langReducer.auth.classN
  }

}

export default compose(
  connect(mapStateToProps, actions),
  reduxForm({ form: 'signin' })
)(signIn)