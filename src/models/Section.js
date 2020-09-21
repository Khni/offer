const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const sectionSchema = mongoose.Schema({
	
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
         
		returnPolicyEn:{
		type: String,
        trim: true,
        require: true,
         }, 
         
		returnPolicyAr:{
		type: String,
        trim: true,
        require: true,
         }, 
         
		gender: {type: String,
        trim: true,
        require: true,}, 

        age: {type: String,
        trim: true,
        require: true,}, 
		
		adminID: {
       type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Admin'
         } ,

         categoryID: {
       type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Category'
         }, 
         
         productsOfSection: [{
            productOfSection:  {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Product'
           } 
      }] 
		
	
	
	})
	
sectionSchema.virtual('products', {
    ref: 'Product',
    localField: '_id',
    foreignField: 'sectionID'
})

sectionSchema.virtual('category', {
    ref: 'Category',
    localField: '_id',
    foreignField: 'sectionsOfCategory'
})
	
	
const Section = mongoose.model('Section', sectionSchema );

module.exports = Section;