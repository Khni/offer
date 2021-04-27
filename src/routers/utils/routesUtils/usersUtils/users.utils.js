const Validator = require('validator');
const isEmpty = require('../../is-empty');
const {setLang} = require('../../../languages/setLang');
const {validateEmailInput, validatePasswordInput, validatePhoneInput, validateConfirmPassInput, validateNameInput} =require('./inputsValidation');

const validateLoginInput = (data, messages) => {
	
  let errors = {};

  const  validateEmail = validateEmailInput(data.email, messages)
if(!validateEmail.valid) errors.email = validateEmail.error

const  validatePassword = validatePasswordInput(data.password, messages)
if(!validatePassword.valid) errors.password = validatePassword.error

  return {
    errors,
    isValid: isEmpty(errors)
  };
};



const validateRegisterInput= (data, messages)=> {
  
  let errors = {};
  
const  validateName = validateNameInput(data.name, messages)
if(!validateName.valid) errors.name = validateName.error

const  validateEmail = validateEmailInput(data.email, messages)
if(!validateEmail.valid) errors.email = validateEmail.error

const  validatePassword = validatePasswordInput(data.password, messages)
if(!validatePassword.valid) errors.password = validatePassword.error

const  validateConfirmPass = validateConfirmPassInput(data.repassword, messages)
if(!validateConfirmPass.valid) errors.password = validateConfirmPass.error

  return {
    errors,
    isValid: isEmpty(errors)
  }
}


const validateUpdateInput = (update, data, messages)=> {
  
  let errors = {};
if(update === 'name' ) {
const  validateName = validateNameInput(data.name, messages)
if(!validateName.valid) errors.name = validateName.error
} 


if(update === 'phone' ) {
const  validatePhone= validateNameInput(data.phone, messages)
if(!validatePhone.valid) errors.name = validatePhone.error
} 

if(update === 'email' ) {
const  validateEmail = validateEmailInput(data.email, messages)
if(!validateEmail.valid) errors.email = validateEmail.error
} 

if(update === 'password' ) {
const  validatePassword = validatePasswordInput(data.password, messages)
if(!validatePassword.valid) errors.password = validatePassword.error

const  validateConfirmPass = validateConfirmPassInput(data.repassword, messages)
if(!validateConfirmPass.valid) errors.password = validateConfirmPass.error
} 

  return {
    errors,
    isValid: isEmpty(errors)
  };
};


module.exports = {validateLoginInput, validateRegisterInput, validateUpdateInput,}