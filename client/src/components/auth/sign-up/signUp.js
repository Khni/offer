import React from 'react';
import Section from './signUp.css';
import { withRouter } from 'react-router-dom';
import Googleicon from './img/googleicon.png';
import FacebookIcon from './img/Facebookicon.png';

const signUp = (props)=>{
   
   return(
    
<div class="main-container">
  <div class="header">
  
</div>

  
  
  
  
  
  
  <div class="form-container">
  <div class="logo-pic">
  </div>
  <h4 class="h3h"> انشاء حساب جديد  </h4>
<form> 


<input type="text"
class="input-text"
placeholder="الاسم الثلاثي"
/>

<input type="email"
class="input-text"
placeholder="الايميل - البريد الالكترونى "
/>

<input type="tel"
class="input-text"
placeholder="رقم الهاتف"
/>


<input type="password"
class="input-text"
placeholder="الرقم السري"
/>

<input type="password"
class="input-text"
placeholder="أعد كتابة الرقم السري للتاكيد"
/>

 
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

export default withRouter(signUp);