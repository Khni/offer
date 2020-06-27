const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const orderSchema = mongoose.Schema({
	
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
	
	
	
	
const Order = mongoose.model('Order', orderSchema );

module.exports = Order;