const HandelErrors = (erMsg) => {
    if (erMsg.contains('LengthError')) {
       return {
        error_en: 'Password must be over 8 characters',
        error_ar: 'الرقم السري يجب ان يكون اكثر من 8'
    }
    }else if (erMsg.contains('passswordcontains') ) {
        return {
            error_en: 'Password can not contain "password" ',
            error_ar: 'الرقم السري لا يمكن ان يحتوي علي كلمة باسورد'
        }
    } else if (erMsg.contains('123456contains')){
        return {
            error_en: 'Password can not contains 123456',
            error_ar: 'الرقم السري لا يمكن ان يحتوي علي 123456'
        }
    }else if (erMsg.contains('inValidEmail')){
        return {
            error_en: 'Email is invalid',
            error_ar: 'الايميل غير صحصح'
        }
    }else {
        return {
            error_en: ' Error',
            error_ar: 'حطأ'
        }
    }
    /*
UnhandledPromiseRejectionWarning: TypeError: HandelErrors is not a function
    */
    return {
        error_en: ' Error',
        error_ar: 'حطأ'
    }
}
module.exports = {
       HandelErrors
};


