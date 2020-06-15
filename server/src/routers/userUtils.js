const HandelErrors = (erMsg) => {
    if (erMsg.includes('inValidEmail')) {
       return {
        
        error_en: 'Email is invalid',
            error_ar: 'الايميل غير صحصح'
    }
    }
    else if (erMsg.includes('LengthError')){
        return {
            error_en: 'Password must be over 8 characters',
        error_ar: 'الرقم السري يجب ان يكون اكثر من 8'
        }
    }
    else if (erMsg.includes('passswordcontains') ) {
        return {
            error_en: 'Password can not contain "password" ',
            error_ar: 'الرقم السري لا يمكن ان يحتوي علي كلمة باسورد'
        }
    } else if (erMsg.includes('123456contains')){
        return {
            error_en: 'Password can not contains 123456',
            error_ar: 'الرقم السري لا يمكن ان يحتوي علي 123456'
        }
    }else {
        return {
            error_en: ' Error',
            error_ar: 'حطأ'
        }
    }
 
    return {
        error_en: ' Error',
        error_ar: 'حطأ'
    }
}
module.exports = {
       HandelErrors
};


