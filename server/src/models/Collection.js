const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const collectionSchema = mongoose.Schema({
	
      nameEn:{
		type: String,
        trim: true,
        require: true,
		 }, 
		nameAr:{
		type: String,
        trim: true,
        require: true,
		 }, 
		descEn:{
		type: String,
        trim: true,
        require: true,
		 }, 
		descAr:{
		type: String,
        trim: true,
        require: true,
		 }, 
		
		adminID:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Admin'
            } 
	
	
	
	})
	

collectionSchema.virtual('products', {
    ref: 'Product',
    localField: '_id',
    foreignField: 'collectionID'
})
	
	
const Collection = mongoose.model('Collection', collectionSchema );

module.exports = Collection;