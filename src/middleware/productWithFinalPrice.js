const express = require('express')


const Product = require('../models/Product')

const finalPrice = (product) =>{
	
	
      
  
  
     let finalPrice = product.price
     let inPercentage = product.inPercentage
     let discountValue = product.discountValue
     if (!inPercentage) {
     	finalPrice = finalPrice - discountValue
    } 
     return finalPrice

}



module.exports = deletePOS