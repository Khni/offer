const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const userSchema = mongoose.Schema({

   



    name: {
        type: String
    },
   
    


}
    ,
    {
        timestamps: true
    })

userSchema.virtual('orders', {
    ref: 'Purchase',
    localField: '_id',
    foreignField: 'supplierID'
})
userSchema.virtual('Review', {
    ref: 'Review',
    localField: '_id',
    foreignField: 'userID'
})

userSchema.virtual('Favorite', {
    ref: 'Favorite',
    localField: '_id',
    foreignField: 'userID'
})
userSchema.virtual('Viewed', {
    ref: 'Viewed',
    localField: '_id',
    foreignField: 'userID'
})


userSchema.virtual('cart', {
    ref: 'Cart',
    localField: '_id',
    foreignField: 'userID'
})

/*
userSchema.virtual('tasks', {
    ref: 'Task',
    localField: '_id',
    foreignField: 'owner'
})
*/

/*
userSchema.virtual('products', {
    ref: 'Product',
    localField: '_id',
    foreignField: 'ownerID'
})
userSchema.virtual('suppliers', {
    ref: 'Supplier',
    localField: '_id',
    foreignField: 'ownerID'
})
userSchema.virtual('clients', {
    ref: 'Client',
    localField: '_id',
    foreignField: 'ownerID'
})
userSchema.virtual('buyoperations', {
    ref: 'Buy',
    localField: '_id',
    foreignField: 'ownerID'
})

*/
//text password to be hashed
userSchema.pre('save', async function (next) {
    const user = this

    if (user.isModified('local.password')) {
        user.local.password = await bcrypt.hash(user.local.password, 8)
    }

    next()
})
//hide password and token when to send user

userSchema.methods.toJSON = function () {
    const user = this
    const userObject = user.toObject()
    // if (userObject.local.password != undefined) {
    //     delete userObject.local.password
    // }
    //  delete userObject.local.password
    delete userObject.tokens

    return userObject

}


//generate Token 

userSchema.methods.generateAuthToken = async function () {
    const user = this
    const token = jwt.sign({ _id: user._id.toString() }, 'secret', { expiresIn: "1h" })
    const refreshToken = jwt.sign({ _id: user._id.toString() }, 'refreshToken', { expiresIn: '7 days' })
    user.tokens = user.tokens.concat({ token })
    user.refreshToken = refreshToken
    await user.save()
    const tokens = {
        token,
        refreshToken
    }
    return tokens
}

//signup 
userSchema.statics.signUp = async (email, password) => {
    const userLogin = await User.findOne({ "local.email": email })
    if (!userLogin) {
        throw new Error({ error: 'unable to Login' })
    }
    const isTruePassword = await bcrypt.compare(password, userLogin.local.password)
    if (!isTruePassword) {
        throw new Error({ error: 'unable to Login' })
    }


    return userLogin
}

//login verify
userSchema.statics.findByCredentials = async (email, password) => {
    const userLogin = await User.findOne({ "local.email": email })
    if (!userLogin) {
        throw new Error({ error: 'unable to Login' })
    }
    const isTruePassword = await bcrypt.compare(password, userLogin.local.password)
    if (!isTruePassword) {
        throw new Error({ error: 'unable to Login' })
    }


    return userLogin
}


const User = mongoose.model('User', userSchema)
/*
userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({ email })
    if (!user) {
        throw new Error('Unable to login')
    }
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
        throw new Error('Unable to login')
    }
    return user
}
*/

module.exports = User;