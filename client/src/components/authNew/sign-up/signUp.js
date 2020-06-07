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
import Form from '../form/form.component';
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

  
  
const fieldsets = [

{
                type: "text" 
                name:"name" 
                ID :"name" 
                className: "input-text-auth" 
                placeholder: "name" 
                label: "االاسم" 
} 

. {
               type: "text" 
                name:"email" 
                ID :"email" 
                className: "input-text-auth" 
                placeholder: "email" 
                label: "البريد الإلكتروني" 
}, 
{
                type: "text" 
                name:"password" 
                ID :"password" 
                className: "input-text-auth" 
                placeholder: "password" 
                label: "الرقم السري" 
}, 

{
                type: "text" 
                name:"repassword" 
                ID :"repassword" 
                className: "input-text-auth" 
                placeholder: "re-enter password" 
                label: "الرقم السري" 
} 

, {
                type: "tel" 
                name:"phone" 
                ID :"phone" 
                className: "input-text-auth" 
                placeholder: "phonw" 
                label: "رقم الهاتف " 
}, 



] 


  render() {
    const { handleSubmit } = this.props;
    return (

      <div class="main-container-signup">
   <Form
   title="إنشاء حساب جديد" 
   fieldsets={this.fieldsets}
   social=true
   onSubmit={this.onSubmit(formData) } 
   errorMsg: {this.props.errorMsg} 
   fbres={this.responseFacebook(res)} 
   googleres={this.responseGoogle(res)}
   />
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