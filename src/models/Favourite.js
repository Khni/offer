const mongoose = require('mongoose')


const favoriteSchema = mongoose.Schema({
	
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
	


	
	
const Favorite = mongoose.model('Favorite', favoriteSchema );

module.exports = Favorite;