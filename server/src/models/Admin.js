const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const hashed = required('../keys/admin.js' ) 
const hashpass = hashed.hash;
const adminSchema = mongoose.Schema({
    adminname:{
    	type: String,
        trim: true,
        require: true
   }, 
   phone:{
    	type: Number,
        trim: true,
        require: true
   }, 
   email: {
        type: String,
        trim: true,
        require: true,
        lowercase: true,
        unique: true,
        validate(value){
            if (!validator.isEmail(value)) {
                throw new Error('Email is invalid')
            }
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
        trim: true,
        validate(value) {
            if (value.toLowerCase().includes('password')) {
                throw new Error('Password cannot contain "password"')
            }
            if (value.toLowerCase().includes('123456')) {
                throw new Error('Password cannot contain "123456"')
            }
        }
    }, 
    tokens:[
        {
            token:{
                type: String,
                required: true
            }
        }
    ]
   
  
}, {

timestamps: true
} )


//Admin verify
adminSchema.statics.verifyAdmin = async (password)=>{
    
    const isTruePassword = await bcrypt.compare(password, hashpass)
    if (!isTruePassword) {
     return false;
    }
 
    
    return true;
 }





const Admin = mongoose.model('Admin', adminSchema );

module.exports Admin;