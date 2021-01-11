import './form.scss';

import Googleicon from './img/googleicon.png';
import FacebookIcon from './img/Facebookicon.png';
import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
// import { connect } from 'react-redux';
// import { compose } from 'redux';
import InputForm from './input';
import LoadingScreen from '../loadingScreen/loadingScreen.js' 
import GoogleLogin from 'react-google-login';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import { Link } from 'react-router-dom';

class Form extends Component {

  constructor(props) {
    super(props);
    this.state = {
      Loading: this.props.LoadingBtn,
    }
    this.onSubmit = this.onSubmit.bind(this);
    this.responseGoogle = this.responseGoogle.bind(this);
    this.responseFacebook = this.responseFacebook.bind(this);

  }

  async onSubmit(formData) {


    this.props.onSubmit(formData)
  }


  componentDidMount() {

    this.props.removeErr()


  }
  async responseGoogle(res) {
    this.props.googleres(res)
  }

  async responseFacebook(res) {
    this.props.fbres(res)
  }


  
  componentWillUnmount() {

    this.props.removeErr()

  }

  render() {
    const { handleSubmit } = this.props;
    return (










      <div class="form-container-form">
        {/* <Link class="logo-pic-form" to="/" />
          
          <h4 class="form-title"> {this.props.title} </h4>*/}

        <form onSubmit={handleSubmit(this.onSubmit)}>
          {this.props.fieldsets.map((field) =>
            <fieldset>
              <Field
                type={field.type}
                name={field.name}
                id={field.id}
                classN={this.props.classN}
                placeholder={field.placeholder}
                component={InputForm}
                label={field.label}
                labelClass={this.props.labelClass}
              />
            </fieldset>
          )}



          {this.props.errorMsg ? <div className="errorMsg">{this.props.errorMsg}</div> : null}
          {!this.props.LoadingBtn ?
            <button type="submit" class="custum-btn-form">{this.props.submitBtnTitle}</button>
            : <LoadingScreen />

{/*<div className="loadingBtnDiv"><div className="loaderbTn" /></div>*/} 
}

        </form>


        {this.props.signin && this.props.social ?
          <div className="ToSignUp">
            <h5> {this.props.ToSignUp}</h5>
            <Link to={this.props.signupLink} >{this.props.signup_title} </Link>
          </div>
          : null}

        {this.props.social ?

          <div>
            <h5 > أو تسجيل الدخول عن طريق حسابك فيسبوك أو جوجل</h5>
            <div className="social-btns">

              <FacebookLogin
                appId=""
                textButton="Facebook"
                render={renderProps => (
                  <img alt="FB" className="fb-btn" src={FacebookIcon} onClick={renderProps.onClick} />
                )}
                fields="name,email,picture"
                callback={this.props.fbres}


              />


              <GoogleLogin
                clientId="682621113652-hrspt3l9krupdvsk3gib2nqvdsn20i8m.apps.googleusercontent.com"
                buttonText='Google'
                render={renderProps => (
                  <img alt="Google" className="google-btn" src={Googleicon} onClick={renderProps.onClick} disabled={renderProps.disabled} />
                )}
                isSignedIn={false}

                onSuccess={this.props.googleres}
                onFailure={this.props.googleres}

              />

            </div>
          </div> : null}




      </div>






    );
  }
}


export default reduxForm({ form: 'form' })
  (Form)