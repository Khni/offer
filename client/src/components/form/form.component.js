import Style from './signUp.css';
import { withRouter } from 'react-router-dom';
import * as RouterDom from 'react-router-dom';
import Googleicon from './img/googleicon.png';
import FacebookIcon from './img/Facebookicon.png';
import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import { compose } from 'redux';
import InputForm from '../inputForm.js';
import * as actions from '../../../store/actions/users.js';
import GoogleLogin from 'react-google-login';
import FacebookLogin from 'react-facebook-login';
import { Link } from 'react-router-dom';

class Form extends Component {

  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this)
    this.responseGoogle = this.responseGoogle.bind(this);
    this.responseFacebook = this.responseFacebook.bind(this);

  }

  async onSubmit(formData) {


    const { signUp } = this.props;
    await signUp(formData);

    this.props.history.push('/dashboard')

  }

  async responseGoogle(res) {
    await this.props.oauthGoogle(res.accessToken);
    if (!this.props.errorMessage) {
      this.props.history.push('/');
    }
  }

  async responseFacebook(res) {
    await this.props.oauthFacebook(res.accessToken);
    if (!this.props.errorMessage) {
      this.props.history.push('/');
    }
  }

  async   handleSubmit(event) {
    alert(event.name)
    console.log("Hello")
    event.preventDefault()
  }
  responseGoogle(response) {
    console.log(response);
  }

  render() {
    const { handleSubmit } = this.props;
    return (

      
        







        <div class="form-container-signup">
          <Link class="logo-pic-signup" to="/"/>
          
          <h4 class="form-title"> this.props.title </h4>
          <form onSubmit={handleSubmit(this.onSubmit)}>
{ this.props.fieldsets.map((field) => 
<fieldset>
              <Field
                type={field.type}
                name={field.name}
                id={field.id}
                className=(field.fieldsize}
                placeholder={field.placeholder}
                component={InputForm}
                label={field.label}
              />
            </fieldset>
)} 

            




            <button type="submit" class="custum-btn-form">تسجيل</button>
          </form>

{props.social ? 
          <h5 > أو تسجيل الدخول عن طريق حسابك فيسبوك أو جوجل</h5>
          <div className="social-btns">
            <div className="fb-btn">
              <FacebookLogin
                appId=""
                textButton="Facebook"
                fields="name,email,picture"
                callback={this.props.fbres}


              />
            </div>
            <div className="google-btn">
              <GoogleLogin
                clientId="746252017489-f5c1v2vlrlhum6vrl2epec0t74qccbvi.apps.googleusercontent.com"
                buttonText='Google'
                onSuccess={this.props.googleres}
                onFailure={this.props.googleres}

              />
            </div>
          </div> : null} 




        </div>

      




    );
  }
}


export default Form 