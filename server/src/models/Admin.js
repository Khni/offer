const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const hashed = require('../keys/admin.js') 
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
userSchema.virtual('product', {
    ref: 'Product',
    localField: '_id',
    foreignField: 'adminID'
})
userSchema.virtual('category', {
    ref: 'Category',
    localField: '_id',
    foreignField: 'adminID'
})
userSchema.virtual('section', {
    ref: 'Section',
    localField: '_id',
    foreignField: 'adminID'
})




adminSchema.pre('save', async function (next) {
    const admin = this

    if (admin.isModified('password')) {
        admin.password = await bcrypt.hash(admin.password, 8)
    }

    next()
})
//generate token
adminSchema.methods.generateAuthToken = async function(){
    const admin = this
    const token = jwt.sign({_id: admin._id.toString()}, 'secret',{expiresIn: '7 days'})
    admin.tokens = admin.tokens.concat({token})
    await admin.save()
    return token
}

//Admin verify
adminSchema.statics.verifyAdmin = async (password)=>{
    
    const isTruePassword = await bcrypt.compare(password, hashed)
    
    return isTruePassword;

 }


//login verify
adminSchema.statics.loginVerify = async (email,password)=>{
    const adminLogin = await User.findOne({email: email})
    if (!adminLogin) {
        throw new Error('unable to Login') 
    }
    const isTruePassword = await bcrypt.compare(password, adminLogin.password)
    if (!isTruePassword) {
     throw new Error('unable to Login') 
    }
 
    
    return adminLogin
 }


const Admin = mongoose.model('Admin', adminSchema );

module.exports = Admin;