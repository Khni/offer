const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const reviewSchema = mongoose.Schema({


userID: {
                type: mongoose.Schema.Types.ObjectId,
                required: true, 
                ref: 'User'

            }, 
            productID: {
                type: mongoose.Schema.Types.ObjectId,
                required: true, 
                ref: 'Admin'

            }, 


    active: {
        type: Boolean
        
    }, 
            rate: {
                type: Number,
                trim: true,
            },
            title: {
                type: String,
                trim: true

            },
            comment: {
                type: String,
                trim: true

            },
            
            
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

const Review= mongoose.model('Review', reviewSchema);

module.exports = Review;
