const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const shortid = require('shortid');
shortid.characters('0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ$@');
const orderSchema = mongoose.Schema({


  shortid: {
    'type': String,
    'default': shortid.generate
  },
	
	userID: {
type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
       }, 
       orderNum: {
         type: Number,
         required: true

       },
	products:[{
        _id:{
          type: mongoose.Schema.Types.ObjectId,
        //required: true,
        ref: 'Product'

            }, 
            nameEn:{
          type: String,
        required: true,
        ref: 'Product'

            }, 
      quantity: {
       type: Number,
        required: true
       }, 
       price: {
       type: Number,
        required: true
       }
       
        }] , 
        totalPrice: {
       type: Number,
        required: true
       }, 
       status:{
          type: String 
            }, 
            
            
            address : {
         _id: {
            type: mongoose.Schema.Types.ObjectId,

         },
        firstName: {
                type: String,
                trim: true
            }, 
            lastName: {
                type: String,
                trim: true
            }, 
            phone: {
               type: Number,
              trim: true,

              },
              country: {
        type: String,
        trim: true,

            },
            city: {
        type: String,
        trim: true,

            },
            street: {
        type: String,
        trim: true,

            },
            floor: {
        type: Number,
        trim: true,

            },
            apartment : {
        type: Number,
        trim: true,

            },
            landmark: {
        type: String,
        trim: true

            }
    },
            
     
	
	}, 
{
    timestamps: true
}
)
	
	
	
	
const Order = mongoose.model('Order', orderSchema );

module.exports = Order;