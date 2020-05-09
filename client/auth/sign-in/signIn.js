import React from 'react';
import Section from './signIn.css';
import { withRouter } from 'react-router-dom';
import Googleicon from './img/googleicon.png';
import FacebookIcon from './img/Facebookicon.png';
import { Link } from 'react-router-dom';

const signIn = (props)=>{
   
   return(
    
<div class="main-container">
  <div class="header">
  
</div>

  
  
  
  
  
  
  <div class="form-container">
  <div class="logo-pic">
  </div>
  <h4 class="h3h"> تسجيل الدخول </h4>
<form> 




<input type="email"
class="input-text"
placeholder="الايميل - البريد الالكترونى "
/>




<input type="password"
class="input-text"
placeholder="الرقم السري"
/>



 
 <button type="submit" class="btn btn-primary shadow w50px grad">تسجيل</button>

<p> او قم بانشاء حساب من   
<Link style={{color: "blue"}} to='/signup'>  هنا   </Link>
</p>
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

export default withRouter(signIn);