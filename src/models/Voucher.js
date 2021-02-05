const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const voucherSchema = mongoose.Schema({

    affiliatePartnerID: {//if the user affiliate program added it 
        type: mongoose.Schema.Types.ObjectId

    },
    code: {
        unique: true,
        index: true,
        type: String,
        trim: true,
        required: true,
        
    },
    discount: {
        inPercentage: { //true if the dicount in Percentage

            type: Boolean,
            required: true
        },
        value: {
            type: Number,
            trim: true
        }

    } ,
   
    minValue: {
        type: Number,
        trim: true
    },
    maxValue: {
        type: Number,
        trim: true
    },
    validFrom: {
        type: Date,
        trim: true
    },
    validUntil: {
        type: Date,
        trim: true,
        required: true
    },
    isEnabled: {
        type: Boolean,

    },
    timesToUse: {// how many times the users can use it
        type: Number,
        trim: true

    },
    allUsers: { //true if for all
        type: Boolean,
        required: true
    },
    validList: [{//users _ids if it's not for        all  users 
        userID: {
            type: mongoose.Schema.Types.ObjectId
        }
    }], 

    usersApplied: [{//useful if the user only have limited times to use the Voucher or truck who used it 
        userID: {
            type: mongoose.Schema.Types.ObjectId
        },
        orderID: {

            type: mongoose.Schema.Types.ObjectId

        },
        date: {
            type: Date,
            default: () => Date.now()
        },
    }],


    allProducts: {
        type: Boolean,
        required: true

    }, //true if applied to all, false if selected products
    selectedProducts: [{
        productsID: {
            type: mongoose.Schema.Types.ObjectId
        }
    }] //if not applied to all


},
    {
        timestamps: true
    }
)
/*
reviewSchema.virtual('Orders', {
    ref: 'Order',
    localField: 'nameEn',
    foreignField: 'productName'
})
reviewSchema.virtual('cart', {
    ref: 'Cart',
    localField: 'name',
    foreignField: 'productName'
})
reviewSchema.virtual('section', {
    ref: 'Section',
    localField: '_id',
    foreignField: 'productsOfSection.productOfSection'
})
reviewSchema.virtual('Favorite', {
    ref: 'Favorite',
    localField: '_id',
    foreignField: 'productID'
})
reviewSchema.virtual('Viewed', {
    ref: 'Viewed',
    localField: '_id',
    foreignField: 'productID'
})
reviewSchema.virtual('Orders', {
    ref: 'Order',
    localField: '_id',
    foreignField: 'productID'
})
reviewSchema.virtual('cart', {
    ref: 'Cart',
    localField: 'name',
    foreignField: 'productName'
})*/

const Voucher = mongoose.model('Voucher', voucherSchema);

module.exports = Voucher;