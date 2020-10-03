const mongoose = require('mongoose')


const viewedSchema = mongoose.Schema({
	
      productID:{
		type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Product'
		 }, 
		userID:{
		type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
		 }
	
	})
	


	
	
const Viewed = mongoose.model('Viewed', viewedSchema );

module.exports = Viewed;