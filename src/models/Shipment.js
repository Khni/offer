const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const shipmentSchema = mongoose.Schema({
    //delivery boy
    shipperID: {
        type: String,
        trim: true,
        require: true,
    },

    company: {
        type: String,
        trim: true,
        
    },

    orderID: {
        type: String,
        trim: true,
        require: true,
    },

    recipient: {
        type: String,
        trim: true,
        require: true,
    },
    active: {
        type: Boolean

    },

    returnPolicyEn: {
        type: String,
        trim: true,
        require: true,
    },

    returnPolicyAr: {
        type: String,
        trim: true,
        require: true,
    },

    gender: {
        type: String,
        trim: true,
        require: true,
    },

    age: {
        type: String,
        trim: true,
        require: true,
    },

    adminID: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Admin'
    },

    categoryID: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Category'
    },

    productsOfSection: [{
        productOfSection: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product'
        }
    }]



}

    ,
    {
        timestamps: true
    })

sectionSchema.virtual('products', {
    ref: 'Product',
    localField: '_id',
    foreignField: 'sectionID'
})

sectionSchema.virtual('category', {
    ref: 'Category',
    localField: '_id',
    foreignField: 'sectionsOfCategory'
})


const Shipment = mongoose.model('Shipment', shipmentSchema);

module.exports = Shipment;