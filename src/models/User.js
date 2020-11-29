const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const userSchema = mongoose.Schema({

    methods: {
        type: [String],
        required: true
    },



    name: {
        type: String
    },
    firstName: {
        type: String
    },
    LastName: {
        type: String
    },
    age: {
        type: Number
    },
    active: {
        type: Boolean

    },
    local: {

        email: {
            type: String,
            trim: true,
            //required: function () { return this.methods === 'local'; }, // Only required if a equals 'test'
            lowercase: true,
            //unique: true,
            validate(value) {
                if (!validator.isEmail(value)) {
                    throw new Error('inValidEmail')
                }
            }
        },
        /*  username:{
              type: String,
              trim: true,
             // require: true,
            //  unique: true,
              validate(value){
                if (validator.contains(value," ")) {
                  throw new Error('Username can not contain spaces')
                }
              }
          },*/
        password: {
            type: String,
            // required: true,
            //  minlength: 8,
            //required: function () { return this.methods === 'local'; },
            trim: true,
            validate(value) {
                if (value.toLowerCase().includes('password')) {
                    throw new Error('passswordcontains')
                }
                if (value.toLowerCase().includes('123456')) {
                    throw new Error('123456contains')
                }
                if (value.length < 8) {
                    throw new Error('LengthError')
                }

            }
        }
    },


    google: {
        id: {
            type: String
        },
        email: {
            type: String,
            lowercase: true
        }
    },
    facebook: {
        id: {
            type: String
        },
        email: {
            type: String,
            lowercase: true
        }
    },


    phone: {
        type: Number,
        trim: true,

    },



    addresses: [{
        // address: {
        firstName: {
            type: String,
            trim: true
        },
        lastName: {
            type: String,
            trim: true
        },
        phone: {
            type: Number,
            trim: true,

        },
        country: {
            type: String,
            trim: true,

        },
        city: {
            type: String,
            trim: true,

        },
        street: {
            type: String,
            trim: true,

        },
        floor: {
            type: Number,
            trim: true,

        },
        apartment: {
            type: Number,
            trim: true,

        },
        landmark: {
            type: String,
            trim: true

        },
        // }
    }],

    defaultAddress: {
        _id: {
            type: mongoose.Schema.Types.ObjectId,

        },
        firstName: {
            type: String,
            trim: true
        },
        lastName: {
            type: String,
            trim: true
        },
        phone: {
            type: Number,
            trim: true,

        },
        country: {
            type: String,
            trim: true,

        },
        city: {
            type: String,
            trim: true,

        },
        street: {
            type: String,
            trim: true,

        },
        floor: {
            type: Number,
            trim: true,

        },
        apartment: {
            type: Number,
            trim: true,

        },
        landmark: {
            type: String,
            trim: true

        }
    },



    tokens: [
        {
            token: {
                type: String,
                required: true
            }
        }
    ]
    ,
    refreshToken: {
        type: String
    }








}
    ,
    {
        timestamps: true
    })

userSchema.virtual('orders', {
    ref: 'Order',
    localField: '_id',
    foreignField: 'userID'
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
    const token = jwt.sign({ _id: user._id.toString() }, 'secret', { expiresIn: "1m" })
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