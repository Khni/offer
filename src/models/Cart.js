const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const cartSchema = mongoose.Schema({
	
	
	
	
	userID: {
type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
       }, 
	products:[{
        productID:{
          type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Product'

            }, 
            productName:{
          type: String,
        required: true,
        ref: 'Product'

            }, 
        quantity: {
       type: Number,
        required: true
       }, 
       priceQuantity: {
       type: Number,
        required: true
       }, 
       totalPrice: {
       type: Number,
        required: true
       }
        }] , 
     
	
	}, 
{
    timestamps: true
}

)
	
	
	
	
const Cart = mongoose.model('Cart', cartSchema );

module.exports Cart;