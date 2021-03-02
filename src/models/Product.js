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


    discount: {

        isActive: { //true there is discount 

            type: Boolean,

        },

        inPercentage: { //true if the dicount in Percentage/ percent will be in this form 0.90 means 10%

            type: Boolean,

        },
        value: {
            type: Number,
            trim: true
        },
        limitedOrder: {//0 if unlimited
            type: Number,
            trim: true
        },


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



    //ordered from vendor
    onOrderQty: {
        type: Number,
        trim: true,

    },
    //order from vendor and in transit, has not been received at location yet 
    transitQty: {
        type: Number,
        trim: true,

    },
    //onHandQty minus reservedQty(actual stock)
    availableQty: {
        type: Number,
        trim: true,

    },

    onlyOrderAvailableQty: {//false if user can order even there is no enough available quantity 
        type: Boolean,
        required: true
    },

    // physically available (including Qty Reserved), minus  “pickedQty"
    onHandQty: {
        type: Number,
        trim: true,

    },
    //ordered by customer
    reservedQty: {
        type: Number,
        trim: true,

    },


    //awaiting shipment(ordered by customer and sitting in box) 
    pickedQty: {
        type: Number,
        trim: true,

    },
    //canceled after reserved or picked
    canceled: {
        type: Number,
        trim: true,

    },
    shippedQty: {
        type: Number,
        trim: true,

    },

    deliveredQty: {
        type: Number,
        trim: true,

    },
    //returned after shipping or deleivered but still inTransit
    returnedinTransitQty: {
        type: Number,
        trim: true,

    },
    //returned in stock
    returnedQty: {
        type: Number,
        trim: true,

    },












    sku: {
        type: String,
        trim: true,
        require: true

    },
    barcode: {
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

    favorites: [
        {
            userID: {
                type: mongoose.Schema.Types.ObjectId
            },
            created: {
                type: Number
            }
        }

    ],
    seen: [
        {
            userID: {
                type: mongoose.Schema.Types.ObjectId
            },
            created: {
                type: Number
            }
        }

    ],
    ordered: [
        {
            userID: {
                type: mongoose.Schema.Types.ObjectId
            },
            quantity: {
                type: Number
            },
            created: {
                type: Number
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

productSchema.virtual('Order', {
    ref: 'Order',
    localField: 'nameEn',
    foreignField: 'productName'
})
productSchema.virtual('Review', {
    ref: 'Review',
    localField: '_id',
    foreignField: 'productID'
})

productSchema.virtual('Cart', {
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

productSchema.virtual('Order', {
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
