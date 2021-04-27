const Validator = require('validator');
const isEmpty = require('../../is-empty');
const { setLang } = require('../../../languages/setLang');
const { validateEmailInput, validatePasswordInput, validatePhoneInput, validateConfirmPassInput, validateNameInput } = require('./inputsValidation');

const validateLoginInput = (data, messages) => {

  let errors = {};

  const validateEmail = validateEmailInput(data.email, messages)
  if (!validateEmail.valid) errors.email = validateEmail.error

  const validatePassword = validatePasswordInput(data.password, messages)
  if (!validatePassword.valid) errors.password = validatePassword.error

  return {
    errors,
    isValid: isEmpty(errors)
  };
};



const validateRegisterInput = (data, messages) => {

  let errors = {};

  const validateName = validateNameInput(data.name, messages)
  if (!validateName.valid) errors.name = validateName.error

  const validateEmail = validateEmailInput(data.email, messages)
  if (!validateEmail.valid) errors.email = validateEmail.error

  const validatePassword = validatePasswordInput(data.password, messages)
  if (!validatePassword.valid) errors.password = validatePassword.error

  const validateConfirmPass = validateConfirmPassInput(data.password, data.repassword, messages)
  if (!validateConfirmPass.valid) errors.password = validateConfirmPass.error

  return {
    errors,
    isValid: isEmpty(errors)
  }
}


const validateUpdateInput = (update, data, messages) => {

  let errors = {};

  if (update === 'name') {
    const validateName = validateNameInput(data.name, messages)
    if (!validateName.valid) errors.name = validateName.error

  } else if (update === 'phone') {
    const validatePhone = validatePhoneInput(data.phone, messages)
    if (!validatePhone.valid) errors.phone = validatePhone.error

  } else if (update === 'email') {
    const validateEmail = validateEmailInput(data.email, messages)
    if (!validateEmail.valid) errors.email = validateEmail.error

  } else if (update === 'password') {
    const validatePassword = validatePasswordInput(data.password, messages)
    if (!validatePassword.valid) errors.password = validatePassword.error
    const validateConfirmPass = validateConfirmPassInput(data.repassword, messages)
    if (!validateConfirmPass.valid) errors.repassword = validateConfirmPass.error

  } else {
    errors.error = messages.error
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};


const updateUser = async (User, update, _id, data, messages) => {
  let errors = {};
  let user = {}

  try {
    
    if (update === 'name') {
      user = await User.findOneAndUpdate({ _id}, { name: data .name}, {
        new: true
      });
    } else if (update === 'phone') {
      user = await User.findOneAndUpdate({ _id}, { phone: data.phone }, {
        new: true
      });

    } else {
      errors.error = messages.error
    }
  } catch (error) {
    errors.error = messages.error

  }

  return {
    errors,
    isValid: isEmpty(errors),
    user
  };

}


module.exports = { validateLoginInput, validateRegisterInput, validateUpdateInput, updateUser}