const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const productSchema = mongoose.Schema({

    nameEn: {
        type: String,
        trim: true,
        require: true,
    },
    nameAr: {
        type: String,
        trim: true,
        require: true,
    },
    descEn: {
        type: String,
        trim: true,
        require: true,
    },
    descAr: {
        type: String,
        trim: true,
        require: true,
    },


    adminID: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Admin'
    },
    price: {
        type: Number,
        trim: true,
        require: true,
    },
    quantity: {
        type: Number,
        trim: true,
        require: true
    },
    sizes: [
        {
            size: {
                type: String,
                trim: true,
            },
            quantity: {
                type: Number,
                trim: true,

            }

        }

    ],

    imgURLs: [
        {
            imgURL: {
                type: String,
                trim: true,
                require: true
            }
        }

    ],
    
    favorites : [
        {
            userID: {
                type: mongoose.Schema.Types.ObjectId
            }
        }

    ],
    seen : [
        {
            userID: {
                type: mongoose.Schema.Types.ObjectId
            }
        }

    ],
    
    active: {
        type: Boolean
        
    },
    

    sectionID: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Section'
    },
    collectionID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Collection'
    },
    oldprice: {
        type: String,
        trim: true,
        require: true,

    },
    gender:
    {
        type: String,
        trim: true,
        require: true,
    },

    age:
    {
        type: String,
        trim: true,
        require: true,
    },

    color:
    {
        type: String,
        trim: true,
        require: true,
    },

    reviews: [
    
        {
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
            userName: {
                type: String,
                trim: true

            },
            userID: {
                type: mongoose.Schema.Types.ObjectId,
                required: true

            }
        }
    ],

    pricehistory: [
        {
            price: {
                type: Number,
                trim: true,


            }
        }
    ],

},
    {
        timestamps: true
    }
)

productSchema.virtual('Orders', {
    ref: 'Order',
    localField: 'nameEn',
    foreignField: 'productName'
})
productSchema.virtual('cart', {
    ref: 'Cart',
    localField: 'name',
    foreignField: 'productName'
})
productSchema.virtual('section', {
    ref: 'Section',
    localField: '_id',
    foreignField: 'productsOfSection.productOfSection'
})

productSchema.virtual('Favorite', {
    ref: 'Favorite',
    localField: '_id',
    foreignField: 'productID'
})
productSchema.virtual('Viewed', {
    ref: 'Viewed',
    localField: '_id',
    foreignField: 'productID'
})

productSchema.virtual('Orders', {
    ref: 'Order',
    localField: '_id',
    foreignField: 'productID'
})
productSchema.virtual('cart', {
    ref: 'Cart',
    localField: 'name',
    foreignField: 'productName'
})

const Product = mongoose.model('Product', productSchema);

module.exports = Product
