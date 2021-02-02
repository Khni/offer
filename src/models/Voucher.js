const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const voucherSchema = mongoose.Schema({


    code: {
        type: String,
        trim: true,
        
    },
   
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
        trim: true
    },
    isEnabled: {
        type: Boolean,

    },
    allUsers: {
        type: Boolean
    }, //true if for all
    validList: [{
        userID: {
            type: mongoose.Schema.Types.ObjectId
        }
    }], //users _ids if it's not for        all  users 

    usersApplied: [{//useful if the user only have limited times to use the Voucher or truck who used it 
        userID: {
            type: mongoose.Schema.Types.ObjectId
        },
        date: {
            type: Date,
            default: () => Date.now()
        },
    }],


    allProducts: {
        type: Boolean,

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
