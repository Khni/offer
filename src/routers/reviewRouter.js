const auth = require('../middleware/auth')
const express = require('express')
const Review = require('../models/Review')
const Product = require('../models/Product')
const User = require('../models/User')
const router = new express.Router()





router.post('/api/review/add', auth, async (req, res) => {

    
    const review = new Review({
        ...req.body,
        active: false, 
        userID: req.user._id

    })

    try {
        await review.save()
        
        res.status(201).send({ review })
    } catch (e) {
        res.status(400).send({ e })
    }
})




router.get('/api/product-reviews/:id', auth, async (req, res) => {
    const reviews = await Review.find({ productID: req.params.id})
  

    let product = await Product.find({_id : req.params.id})
  
let productsWreviews =await Promise.all( products.map(async(product)=>{
const productReviews = await Review.find({ productID: product._id})
let rev5 = productReviews.filter((rev)=>rev.rate==5).length 
    let rev4 = productReviews.filter((rev)=>rev.rate==4).length * 0.8
    let rev3 = productReviews.filter((rev)=>rev.rate==3).length * 0.6
    let rev2 = productReviews.filter((rev)=>rev.rate==2).length * 0.4
    let rev1 = productReviews.filter((rev)=>rev.rate==1).length * 0.2
    
    let revsCount = productReviews.length
    let ratingCount = (rev5+rev4+rev3+rev2+rev1) 
let rating=(ratingCount/revsCount) *5
if(rating== null) {
	rating=0
	} 




return {...product.toObject(),  reviews : productReviews, rating: rating}
}))

    try {

        res.status(200).send({ favoriteProducts })
    } catch (e) {
        res.status(400).send({ e })
    }
})




router.get('/api/productWithReviews/:id',  async (req, res) => {
    
  

    let product = await Product.find({_id : req.params.id})
    
    
  
const productReviews = await Review.find({$and:[{ productID: product._id}, { active: true}]})
let revsCount = productReviews.length
let rating = 0
if (revsCount != 0) {
    let rev5 = productReviews.filter((rev)=>rev.rate==5).length 
    let rev4 = productReviews.filter((rev)=>rev.rate==4).length * 0.8
    let rev3 = productReviews.filter((rev)=>rev.rate==3).length * 0.6
    let rev2 = productReviews.filter((rev)=>rev.rate==2).length * 0.4
    let rev1 = productReviews.filter((rev)=>rev.rate==1).length * 0.2
    
  
    let ratingCount = (rev5+rev4+rev3+rev2+rev1) 
 rating=(ratingCount/revsCount) *5
console.log( revsCount);

}







    try {

        res.status(200).send({ product , rating , productReviews })
    } catch (e) {
        res.status(400).send({ e })
    }
})


module.exports = router

