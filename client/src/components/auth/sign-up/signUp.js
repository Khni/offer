import Section from './signUp.css';
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

class signUp extends Component{
   
   constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
    
  }

  async onSubmit(formData) {
  	const { signUp } = this.props;
    await signUp(formData);
    console.log(formData);
    
    
  }
   
   
   
   
   
   render() {
   	const { handleSubmit } = this.props;
   return(
    
<div class="main-container">
  <div class="header">
  
</div>

  
  
  
  
  
  
  <div class="form-container">
  <div class="logo-pic">
  </div>
  <h4 class="h3h"> انشاء حساب جديد  </h4>
<form onSubmit={handleSubmit(this.onSubmit)}> 


<fieldset>
  <Field 
type="text"
name="name" 
id="name" 
class="input-text"
placeholder="الاسم الثلاثي"
component={ InputForm }
/>
</fieldset>



<fieldset>
  <Field 
type="text"
name="email" 
id="email" 
class="input-text"
placeholder="الايميل - البريد الالكترونى "
component={ InputForm }
/>
</fieldset>



<fieldset>
  <Field 
type="tel"
name="phone" 
id="phone" 
class="input-text"
placeholder="رقم الهاتف"
component={ InputForm }
/>
</fieldset>


<fieldset>
  <Field 
type="password"
name="password" 
id="password" 
class="input-text"
placeholder="اكتب الرقم السري"
component={ InputForm }
/>
</fieldset>

<fieldset>
  <Field 
type="password"
name="repassword" 
id="repassword" 
class="input-text"
placeholder="أعد كتابة الرقم السري" 
component={ InputForm }
/>
</fieldset>



 
 <button type="submit" class="btn btn-primary shadow w50px grad">تسجيل</button>


<h5 > أو تسجيل الدخول عن طريق حسابك فيسبوك أو جوجل</h5>

<div class="social-icons">
<img src={FacebookIcon}  class="fbicon"
height="50"
width="50"
/>
<img src={Googleicon}  class="gicon"
height="50"
width="50"
/>




</div>

 </form>


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