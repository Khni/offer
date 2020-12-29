import './signIn.css';

import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { selectAuthLang } from '../../../../store/reducers/langReducer/langReselect';
import { selectAdminAuth } from '../../../../store/reducers/admin/auth/adminReselect';
import * as actions from '../../../../store/actions/admins';

import Form from '../../../../components/form/form.component';
class signIn extends Component {

  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);


  }
  authLeft() {
    //some code 
  }
  async onSubmit(formData) {


    console.log(formData);
    const { signIn } = this.props;
    await signIn(formData);
    if (!this.props.errorMsg) {
      this.props.history.push('/admin')
    }
  }






  fieldsets = [

    {
      type: "text",
      name: "email",
      ID: "email",
      className: this.props.classN,
      placeholder: this.props.emailString,
      label: "Admin Email"
    },
    {
      type: "password",
      name: "password",
      ID: "password",
      className: this.props.classN,
      placeholder: this.props.passwordString,
      label: "Admin Password"
    }



  ]


  render() {

    return (

      <div class="main-container-signin">
        <Form
          title="Admin Login To Dashboard"
          fieldsets={this.fieldsets}
          social={false}
          onSubmit={this.onSubmit}
          errorMsg={this.props.errorMsg}
          // fbres={this.responseFacebook} 
          //  googleres={this.responseGoogle}
          submitBtnTitle={this.props.submit_signin_btn}
          signin={true}
          // signupLink="/signup" 
          // ToSignUp={this.props.ToSignUp}
          signup_title={this.props.signup_title}
          removeErr={this.authLeft}
        />
      </div>




    );
  }
}

const mapStateToProps = state => {
  return {
    errorMsg: selectAdminAuth(state).error,
    //selectAdminAuth(state).error,
    //state.adminAuth.error
    submit_signin_btn: selectAuthLang(state).submit_signin_btn,
    signin_title: selectAuthLang(state).signin_title,
    emailString: selectAuthLang(state).email,
    passwordString: selectAuthLang(state).password,
    classN: selectAuthLang(state).classN,
    ToSignUp: selectAuthLang(state).ToSignUp,
    signup_title: selectAuthLang(state).signup_title
  }

}

export default compose(
  connect(mapStateToProps, actions),
  reduxForm({ form: 'signin' })
)(signIn)