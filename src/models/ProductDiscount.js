const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const voucherSchema = mongoose.Schema({
	
	productID: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Product'
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
    inPercentage: { //true if the dicount in Percentage/ percent will be in this form 0.90 means 10%

        type: Boolean,

    },
    discountValue: {
        type: Number,
        trim: true
    },
    limitedOrder: {//0 if unlimited
        type: Number,
        trim: true
    },

    adminID: {//who submit the discount 
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Admin'
    }


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