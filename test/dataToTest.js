const userToSignUp = {
 	
    name: "khaled mohamed",
    age: 29,
    email:  "khaled@gmail.com",
    password: "atobsaatobsa",
    repassword: "atobsaatobsa"
}

const userToLogin = {
 	
    
    email:  "khaled@gmail.com",
    password: "atobsaatobsa",
    
}

const userToLoginWrongPass = {
 	
    
    email:  "khaled@gmail.com",
    password: "atobsaatob",
    
}

const userToLoginWrongEmail = {
 	
    
    email:  "khalded@gmail.com",
    password: "atobsaatobsa",
    
}


const userToSignUpWrongRepass= {
 	
    name: "khaled mohamed",
    age: 29,
    email:  "khaled@gmail.com",
    password: "atobsaatobsa",
    repassword: "atobsaatob"
}


module.exports = { userToSignUp, userToLogin}
