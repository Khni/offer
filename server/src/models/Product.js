const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const productSchema = mongoose.Schema({
	
	name:{
		type: String,
        trim: true,
        require: true,
		 },
	price:{
		type: Float,
        trim: true,
        require: true,
		 },
	oldprice:{
		type: String,
        trim: true,
        
		 },
	 pricehistory:[
            {
            pricehistory:{
           type: Float,
           trim: true,
        

             }
          }
        ],
	
	},
{
    timestamps: true
}
)
	
	
	
	
const Product = mongoose.model('Product', productSchema );

module.exports Product
	