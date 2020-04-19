const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const categorySchema = mongoose.Schema({
	
      name:{
		type: String,
        trim: true,
        require: true,
		 }
	
	
	
	})
	
categorySchema.virtual('products', {
    ref: 'Product',
    localField: '_id',
    foreignField: 'categoryID'
})
	
	
const Category = mongoose.model('Category', categorySchema );

module.exports Category;