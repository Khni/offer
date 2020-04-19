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
	quantity :{
        type: Number,
        trim: true,
        require: true
         }, 
     imgURL: [
               {
             imgURL:{
               type: String,
               trim: true,
             require: true
                } 
             } 

            ], 
         
	categoryID:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Category'
         },
    sectionID:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Section'
         },
	oldprice:{
		type: String,
        trim: true,
        require: true,
        
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
	
const Product = mongoose.model('Product', productSchema );

module.exports Product
	