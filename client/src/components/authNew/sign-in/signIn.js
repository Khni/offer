import  './signIn.css';

import React, { Component } from 'react';
import { reduxForm} from 'redux-form';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { selectTermsLang } from '../../../store/reducers/langReducer/langsReselect';
//import * as actions from '../../../store/actions/users.js';
import * as actions from '../../../store/actions';
import { selectCartItems } from '../../../store/reducers/cart/cartReselect';
import Form from '../../form/form.component';
class signIn extends Component {

  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);

    this.responseGoogle = this.responseGoogle.bind(this);
    this.responseFacebook = this.responseFacebook.bind(this);

  }
  componentDidUpdate() {
    if (this.props.isAuthenticated && !this.props.errorMsg && this.props.token) {

     
      if (this.props.checkoutRedirectLink) {
        const link = this.props.checkoutRedirectLink
        this.props.chechoutRedirectDone()
        this.props.history.push(link);
      } else {

        this.props.history.push('/');
      }


    }
  }
  async onSubmit(formData) {


    //  const { signIn } = this.props;
    //   await signIn(formData);
    this.props.signInAuth(formData, "login", this.props.cartItems)

  }


  async responseGoogle(res) {
    console.log("google res" + JSON.stringify(res.accessToken));
    //const data = { access_token: res.accessToken }
    // console.log(data+"data");
    this.props.signInAuth({ access_token: res.accessToken }, "goauth", this.props.cartItems)
    //  await this.props.oauthGoogle(res.accessToken);
    // if (this.props.isAuthenticated && !this.props.errorMsg && this.props.token) {
    //   this.props.history.push('/');
    // }
  }

  async responseFacebook(res) {
    //   await this.props.oauthFacebook(res.accessToken);
    this.props.signInAuth({
      accessToken: res.accessToken,
      id: res.id,
      email: res.email

    }, "fbauth", this.props.cartItems)
  }

  componentDidMount() {
    console.log("link" + this.props.checkoutRedirectLink);
  }

  fieldsets = [

    {
      type: "text",
      name: "email",
      ID: "email",
      className: this.props.classN,
      placeholder: this.props.emailString,
      label: this.props.emailString
    },
    {
      type: "password",
      name: "password",
      ID: "password",
      className: this.props.classN,
      placeholder: this.props.passwordString,
      label: this.props.passwordString
    }



  ]




  render() {
    
    return (

      <div class="main-container-auth">
        <Form
          title={this.props.signin_title}
          fieldsets={this.fieldsets}
          classN="juv-input-form-set"
          labelClass="input-label"
          social={true}
          onSubmit={this.onSubmit}
          errorMsg={this.props.errorMsg}
          fbres={this.responseFacebook}
          googleres={this.responseGoogle}
          submitBtnTitle={this.props.submit_signin_btn}
          signin={true}
          signupLink="/authnav/signup"
          ToSignUp={this.props.ToSignUp}
          signup_title={this.props.signup_title}
          removeErr={this.props.authLeft}
          LoadingBtn={this.props.Loading}
        />
      </div>




    );
  }
}

const mapStateToProps = state => {
  return {
    Loading: state.userAuth.authUser.Loading,
    checkoutRedirectLink: state.redirectAuthReducer.authLink,
    errorMsg: state.userAuth.authUser.error,
    name: state.userAuth.authUser.name,
    token: state.userAuth.authUser.token,
    isAuthenticated: state.userAuth.authUser.isAuthenticated,
    submit_signin_btn: selectTermsLang(state).submit_signin_btn,
    signin_title: selectTermsLang(state).signin_title,
    emailString: selectTermsLang(state).email,
    passwordString: selectTermsLang(state).password,
    classN: selectTermsLang(state).classN,
    ToSignUp: selectTermsLang(state).ToSignUp,
    cartItems: selectCartItems(state),
    signup_title: selectTermsLang(state).signup_title
  }

}

const mapDispatchToProps = dispatch => {
  return {

    chechoutRedirectDone: () => dispatch(actions.chechoutRedirectDone()),
    signInAuth: (data, action, cartItems) => dispatch(actions.auth(data, action, cartItems)),
    authLeft: () => dispatch(actions.authLeft())
    //  onSetAuthRedirectPath: () => dispatch( actions.setAuthRedirectPath( '/' ) )
  };
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  reduxForm({ form: 'signin' })
)(signIn)