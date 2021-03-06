const auth = require('../middleware/auth')
const authAdmin = require('../middleware/adminAuth.js' )
const express = require('express')
const Review = require('../models/Review')
const Product = require('../models/Product')
const User = require('../models/User')
const router = new express.Router()

const {getRating, finalPrice} =require('./review.utils')



router.post('/api/review/add', auth, async (req, res) => {

    
    const review = new Review({
        ...req.body,
        active: false, 
        userID: req.user._id,
        

    })

    try {
        await review.save()
        
        res.status(201).send({ review })
    } catch (e) {
        res.status(400).send({ e })
    }
})

router.get('/api/reviews-active',  async (req, res) => {
    const reviews = await Review.find({ active: true})
  
    try {

        res.status(200).send({ reviews })
    } catch (e) {
        res.status(400).send({ e })
    }
})

router.get('/api/reviews-notactive', authAdmin, async (req, res) => {
    const reviews = await Review.find({ active: false})
  
    try {

        res.status(200).send({ reviews })
    } catch (e) {
        res.status(400).send({ e })
    }
})

router.get('/api/reviews/:status', authAdmin, async (req, res) => {
	let reviews = [] 
	if (req.params.status =='active' ) {
reviews = await Review.find({ active: true})
} 
if (req.params.status =='notactive' ) {
reviews = await Review.find({ active: false})
} 
     
  
    try {

        res.status(200).send({ reviews })
    } catch (e) {
        res.status(400).send({ e })
    }
})


router.get('/api/review-activate/:id', authAdmin, async (req, res) => {
const review = await Review.findOne({ _id: req.params.id})
  review.active = true
    

    try {
        await review.save()
        
        res.status(201).send({ review })
    } catch (e) {
        res.status(400).send({ e })
    }
})

router.get('/api/review-deactivate/:id', authAdmin, async (req, res) => {
const review = await Review.findOne({ _id: req.params.id})
  review.active = false
    

    try {
        await review.save()
        
        res.status(201).send({ review })
    } catch (e) {
        res.status(400).send({ e })
    }
})



router.get('/api/productsWithRating',  async (req, res) => {
    const reviews = await Review.find({ active: true})
  

    let products = await Product.find({})
  
let productsWrate =await Promise.all( products.map(async(product)=>{
const productReviews = await Review.find({$and:[{ productID: product._id}, { active: true}]})
const productRate = getRating(productReviews)

return {...product.toObject(),   rate : productRate}
}))

    try {

        res.status(200).send({ productsWrate })
    } catch (e) {
        res.status(400).send({ e })
    }
})




router.get('/api/productWithReviews/:id',  async (req, res) => {
    
  

    let product = await Product.findOne({_id : req.params.id})
    
    
  
const productReviews = await Review.find({$and:[{ productID: req.params.id}, { active: true}]})
const rating = getRating(productReviews)
const finalPrice = finalPrice(product) 

    try {

        res.status(200).send({ product , rating , productReviews ,
         finalPrice: finalPrice.finalPrice, 
         discountInPercentage: finalPrice.discountInPercentage, 
         discountValue: finalPrice.discountValue
 })
    } catch (e) {
        res.status(400).send({ e })
    }
})


module.exports = router

