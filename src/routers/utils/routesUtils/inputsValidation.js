const Validator = require('validator');
const isEmpty = require('../is-empty');
const {setLang} = require('../../languages/setLang');



const ValidateNameInput = (name, messages)=>{
	name = !isEmpty(name) ? name : '';
  if (Validator.isEmpty(name)) {
     return {valid: false, error: messages.nameRequired} 
   }
   
   if (!Validator.isLength(name, { min: 2, max: 30 })) {
    return {valid: false, error: messages.errLength30} 
    
  }
  return {valid: true, error: ''} 
  
}





module.exports = { ValidateNameInput}



