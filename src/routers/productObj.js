const Product = require('../models/Product')

const productFindById =async(id) => {

try{
let product = await Product.findById(id)
  return {
	_id: product._id,
	nameEn: product.nameEn,
	nameAr: product.nameAr,
	nameEn: product.nameEn,
	} 
 } catch (e) {
 	
} 



} 
