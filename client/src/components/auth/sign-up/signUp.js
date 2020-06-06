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

class signUp extends Component {

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

      <div class="main-container-signup">
        <div class="header">

        </div>







        <div class="form-container-signup">
          <Link class="logo-pic-signup" to="/"/>
          
          <h4 class="signup-title"> انشاء حساب جديد  </h4>
          <form onSubmit={handleSubmit(this.onSubmit)}>


            <fieldset>
              <Field
                type="text"
                name="name"
                id="name"
                className="input-text-auth"
                placeholder="الاسم الثلاثي"
                component={InputForm}
                label="الاسم الثلاثي"
              />
            </fieldset>


            <fieldset>
              <Field
                type="text"
                name="email"
                id="email"
                className="input-text-auth"
                placeholder="الايميل- البريد الالكترونى "
                component={InputForm}
                label="البريد الالكتروني - الايميل"
              />
            </fieldset>



            <fieldset>
              <Field
                type="tel"
                name="phone"
                id="phone"
                className="input-text-auth"
                placeholder="رقم الهاتف"
                component={InputForm}
                label="رقم الهاتف"
              />
            </fieldset>


            <fieldset>
              <Field
                type="password"
                name="password"
                id="password"
                className="input-text-auth"
                placeholder="اكتب الرقم السري"
                component={InputForm}
                label="الرقم السري"
              />
            </fieldset>

            <fieldset>
              <Field
                type="password"
                name="repassword"
                id="repassword"
                className="input-text-auth"
                placeholder="برحاء اغد كتابة الرقم السري"
                component={InputForm}
                label="اعد كتابى الرقم السري"

              />
            </fieldset>




            <button type="submit" class="custum-btn-auth">تسجيل</button>
          </form>


          <h5 > أو تسجيل الدخول عن طريق حسابك فيسبوك أو جوجل</h5>
          <div className="social-btns">
            <div className="fb-btn">
              <FacebookLogin
                appId=""
                textButton="Facebook"
                fields="name,email,picture"
                callback={this.responseFacebook}


              />
            </div>
            <div className="google-btn">
              <GoogleLogin
                clientId="746252017489-f5c1v2vlrlhum6vrl2epec0t74qccbvi.apps.googleusercontent.com"
                buttonText="Google"
                onSuccess={this.responseGoogle}
                onFailure={this.responseGoogle}

              />
            </div>
          </div>




        </div>

      </div>




    );
  }
}

const mapStateToProps = state => {
  return {
    errorMsg: state.userAuth.error
  }

}

export default compose(
  connect(mapStateToProps, actions),
  reduxForm({ form: 'signup' })
)(signUp)