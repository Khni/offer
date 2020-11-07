import Style from './signUp.css';
import { withRouter } from 'react-router-dom';
import * as RouterDom from 'react-router-dom';
import Googleicon from './img/googleicon.png';
import FacebookIcon from './img/Facebookicon.png';
import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import { compose } from 'redux';
import {selectTermsLang, selectLang} from  '../../../store/reducers/langReducer/langsReselect';
//import { selectTermsLang, selectLang} from '../../../store/reducers/langReducer/langReselect';
import * as actions from '../../../store/actions';
import GoogleLogin from 'react-google-login';
import FacebookLogin from 'react-facebook-login';
import { Link } from 'react-router-dom';
import Form from '../../form/form.component';
class signUp extends Component {

  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);

    this.state ={
      Loading: this.props.Loading,
    }

    this.responseGoogle = this.responseGoogle.bind(this);
    this.responseFacebook = this.responseFacebook.bind(this);

  }


   async onSubmit(formData) {


    //const { signUp } = this.props;
    let lang = this.props.lang
    console.log(lang)
     await this.props.signUpAuth(formData,"signup") 
  //  await signUp(formData, lang);
    
  }




  async responseGoogle(res) {
    console.log("google res" + JSON.stringify(res.accessToken));
    //const data = { access_token: res.accessToken }
    // console.log(data+"data");
    this.props.signUpAuth({ access_token: res.accessToken }, "goauth")
    //  await this.props.oauthGoogle(res.accessToken);
    // if (this.props.isAuthenticated && !this.props.errorMsg && this.props.token) {
    //   this.props.history.push('/');
    // }
  }

  async responseFacebook(res) {
  //  await this.props.oauthFacebook(res.accessToken);
    // if (!this.props.errorMsg) {
    //   this.props.history.push('/');
    // }
  }



  fieldsets = [

    {
      type: "text",
      name: "name",
      ID: "name",
      className: this.props.classN,
      placeholder: this.props.nameString,
      label: this.props.nameString
    },
   /* {
      type: "tel",
      name: "phone",
      ID: "phone",
      className: this.props.classN,
      placeholder: this.props.phoneString,
      label: this.props.phoneString
    },*/
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
    },
    {
      type: "password",
      name: "repassword",
      ID: "repassword",
      className: this.props.classN,
      placeholder: this.props.repasswordString,
      label: this.props.repasswordString
    }



  ]
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
componentDidMount(){
  
}
// componentWillUnmount() {
//   this.props.authLeft()
// }


  render() {
    const { handleSubmit } = this.props;
    return (

      <div className="container-signup">
        <Form
          title={this.props.terms.signup_title} 
          fieldsets={this.fieldsets}
          social={true}
          onSubmit={this.onSubmit}
          errorMsg={this.props.errorMsg}
          fbres={this.responseFacebook}
          classN="juv-input-form-set"
          labelClass="input-label"
          googleres={this.responseGoogle}
          submitBtnTitle={this.props.submit_signin_btn}
          errorMsg = {this.props.errorMsg}
          LoadingBtn = {this.props.Loading}
          removeErr={this.props.authLeft} 
          
        />
      </div>




    );
  }
}

const mapStateToProps = state => {
  return {
    checkoutRedirectLink: state.redirectAuthReducer.authLink,
    errorMsg: state.userAuth.authUser.error, 
    name: state.userAuth.authUser.name, 
    token: state.userAuth.authUser.token,
    isAuthenticated: state.userAuth.authUser.isAuthenticated, 
    submit_signin_btn: selectTermsLang(state).submit_signin_btn,
    signin_title: selectTermsLang(state).signin_title,
    terms: selectTermsLang(state),
    emailString: selectTermsLang(state).email,
    passwordString: selectTermsLang(state).password,
    nameString: selectTermsLang(state).name,
    repasswordString: selectTermsLang(state).repassword,
    phoneString: selectTermsLang(state).phone,
    classN: selectTermsLang(state).classN,
    Loading: state.userAuth.authUser.Loading,
    //lang: selectLang(state)
    lang: state.langReducer.lang
  }

}

const mapDispatchToProps = dispatch => {
    return {
      chechoutRedirectDone: () => dispatch(actions.chechoutRedirectDone()),
        signUpAuth: ( data,action) => dispatch( actions.auth( data,action) ),
        authLeft: () => dispatch( actions.authLeft())
      //  onSetAuthRedirectPath: () => dispatch( actions.setAuthRedirectPath( '/' ) )
    };
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  reduxForm({ form: 'signup' })
)(signUp)