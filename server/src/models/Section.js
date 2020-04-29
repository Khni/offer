const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const sectionSchema = mongoose.Schema({
	
	name:{
		type: String,
        trim: true,
        require: true,
		 }, 
		adminID: {
       type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Admin'
         } 
		
	
	
	})
	
sectionSchema.virtual('products', {
    ref: 'Product',
    localField: '_id',
    foreignField: 'sectionID'
})
	
	
	
const Section = mongoose.model('Section', sectionSchema );

module.exports Section;