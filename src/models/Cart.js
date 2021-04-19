const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const cartSchema = mongoose.Schema({
	
	
	
	
	userID: {
type: mongoose.Schema.Types.ObjectId,
        required: true,
        unique: true,
        index: true,
        ref: 'User'
       }, 
	products:[{
        productID:{
          type: mongoose.Schema.Types.ObjectId,  
          ref: 'Product'

            }, 
           quantity :{
          type: Number,  
       
            }
            
   
        }] , 
     
	
	}, 
{
    timestamps: true
}

)
	
	
	
	
const Cart = mongoose.model('Cart', cartSchema );

module.exports = Cart;