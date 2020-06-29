const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const categorySchema = mongoose.Schema({
	
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
            }, 
          sections: [{
        section:  {
          type: mongoose.Schema.Types.ObjectId,
           } 
      }] 
	
	
	
	})
	

categorySchema.virtual('sections', {
    ref: 'Section',
    localField: '_id',
    foreignField: 'categoryID'
})
	
	
const Category = mongoose.model('Category', categorySchema );

module.exports = Category;