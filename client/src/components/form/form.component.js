import Style from './form.scss';
import { withRouter } from 'react-router-dom';
import * as RouterDom from 'react-router-dom';
import Googleicon from './img/googleicon.png';
import FacebookIcon from './img/Facebookicon.png';
import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import { compose } from 'redux';
import InputForm from './inputForm.js';

import GoogleLogin from 'react-google-login';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import { Link } from 'react-router-dom';

class Form extends Component {

  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
    this.responseGoogle = this.responseGoogle.bind(this);
    this.responseFacebook = this.responseFacebook.bind(this);

  }

  async onSubmit(formData) {


   this.props.onSubmit(formData) 
  }

  async responseGoogle(res) {
   this.props.googleres(res)
  }

  async responseFacebook(res) {
    this.props.fbres(res) 
  }

  
  responseGoogle(response) {
    console.log(response);
  }

  render() {
    const { handleSubmit } = this.props;
    return (

      
        







        <div class="form-container-form">
          <Link class="logo-pic-form" to="/" />
          
          <h4 class="form-title"> {this.props.title} </h4>
          <form onSubmit={handleSubmit(this.onSubmit)}>
                 { this.props.fieldsets.map((field) => 
             <fieldset>
              <Field
                type={field.type}
                name={field.name}
                id={field.id}
                className={field.className}
                placeholder={field.placeholder}
                component={InputForm}
                label={field.label}
              />
            </fieldset>
                    )} 

            




            <button type="submit" class="custum-btn-form">{this.props.submitBtnTitle}</button>
            
          </form>
         
          {this.props.errorMsg ? <div className="errorMsg">error is:{this.props.errorMsg }</div> : null  }

{this.props.social ? 
    {this.props.signin? 
    <h5> {this.props.ToSignUp}</h5>
    <Link to={this.props.signupLink} >{ this.props.signup_title} </Link>
     : null} 
<div>
          <h5 > أو تسجيل الدخول عن طريق حسابك فيسبوك أو جوجل</h5>
          <div className="social-btns">
            
              <FacebookLogin
                appId=""
                textButton="Facebook"
                render={renderProps => (
                  <img className="fb-btn" src={FacebookIcon} onClick={renderProps.onClick}  />
                )}
                fields="name,email,picture"
                callback={this.props.fbres}


              />
            
            
              <GoogleLogin
                clientId="746252017489-f5c1v2vlrlhum6vrl2epec0t74qccbvi.apps.googleusercontent.com"
                buttonText='Google'
                render={renderProps => (
                  <img className="google-btn" src={Googleicon} onClick={renderProps.onClick} disabled={renderProps.disabled} />
                )}
            
                onSuccess={this.props.googleres}
                onFailure={this.props.googleres}

              />
            
          </div> 
          </div>: null} 




        </div>

      




    );
  }
}


export default reduxForm({ form: 'form' })
(Form)