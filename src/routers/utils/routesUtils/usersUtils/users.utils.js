const Validator = require('validator');
const isEmpty = require('../../is-empty');
const {setLang} = require('../../../languages/setLang');
const {validateNameInput} =require('./inputsValidation');


 


module.exports = function validateLoginInput(data, lang) {
	const messages = setLang(lang) 
  let errors = {};

  data.email = !isEmpty(data.email) ? data.email : '';
  data.password = !isEmpty(data.password) ? data.password : '';

  if (!Validator.isEmail(data.email)) {
    errors.email = messages.invalidEmail;
  }

  if (Validator.isEmpty(data.email)) {
    errors.email = messages.emailRequired;
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = messages.passwordRequired;
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};



const validateRegisterInput= (data, messages)=> {
  
  let errors = {};
  
const  validateName = validateNameInput(data.name, messages)
if(!validateName.valid) errors.name = validateName.error

  //data.name = !isEmpty(data.name) ? data.name : '';
  data.email = !isEmpty(data.email) ? data.email : '';
  data.password = !isEmpty(data.password) ? data.password : '';
  data.repassword = !isEmpty(data.repassword) ? data.repassword : '';
  
 /* if (Validator.isEmpty(data.name)) {
    
    errors.name = messages.nameRequired
  }*/

  if (Validator.isEmpty(data.email)) {
    errors.email = messages.emailRequired
  }

  if (Validator.isEmpty(data.repassword)) {
    errors.repassword = messages.confirmPasswordRequired
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = messages.passwordRequired
  }

  /*if (!Validator.isLength(data.name, { min: 2, max: 30 })) {
    
    errors.name = messages.errLength30
  }*/

  

  if (!Validator.isEmail(data.email)) {
    errors.email = messages.invalidEmail
  }

  

  if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = messages.passwordLength
  }

  

  if (!Validator.equals(data.password, data.password2)) {
    errors.repassword = messages.passwordMatch
  }

  return {
    errors,
    isValid: isEmpty(errors)
  }
}




module.exports = function validateUpdateInput(update, data, lang) {
  const messages = setLang(lang) 
  let errors = {};
if(update === 'name' ) {
date.name= !isEmpty(date.name) ? date.name : '';
if (!Validator.isLength(date.name, { min: 2, max: 30 })) {
    errors.name = messages.errLength30
  }

  if (Validator.isEmpty(date.name)) {
    errors.name = messages.nameRequired
  }
} 






if(update === 'phone' ) {
data.phone = !isEmpty(data.phone) ? data.phone : '';
if (Validator.isEmpty(data.phone)) {
    errors.email = messages.phoneRequired
  }

  if (!validator.isMobilePhone(data.phone)) {
    errors.email = messages.invalidPhone
  }
} 




if(update === 'email' ) {
data.email = !isEmpty(data.email) ? data.email : '';
if (Validator.isEmpty(data.email)) {
    errors.email = messages.emailRequired
  }

  if (!Validator.isEmail(data.email)) {
    errors.email = messages.invalidEmail
  }
} 

if(update === 'password' ) {
data.password = !isEmpty(data.password) ? data.password : '';
  data.repassword = !isEmpty(data.repassword) ? data.repassword : '';
if (Validator.isEmpty(data.password)) {
    errors.password = messages.passwordRequired
  }

  if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = messages.passwordLength
  }

  if (Validator.isEmpty(data.repassword)) {
    errors.repassword = messenges.confirmPasswordRequired
  }

  if (!Validator.equals(data.password, data.password2)) {
    errors.repassword = messages.passwordMatch
  }
} 

  return {
    errors,
    isValid: isEmpty(errors)
  };
};


module.exports = { validateRegisterInput}