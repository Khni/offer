const auth = require('../middleware/auth')
const authAdmin = require('../middleware/adminAuth.js' )
const express = require('express')
const Review = require('../models/Review')
const Product = require('../models/Product')
const User = require('../models/User')
const router = new express.Router()

const {getRating} =require('./review.utils')



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
    
  

    let product = await Product.find({_id : req.params.id})
    
    
  
const productReviews = await Review.find({$and:[{ productID: req.params.id}, { active: true}]})
const Rate = getRating(productReviews)
// let revsCount = productReviews.length
// let rating = 0
// if (revsCount != 0) {
//     let rev5 = productReviews.filter((rev)=>rev.rate==5).length 
//     let rev4 = productReviews.filter((rev)=>rev.rate==4).length * 0.8
//     let rev3 = productReviews.filter((rev)=>rev.rate==3).length * 0.6
//     let rev2 = productReviews.filter((rev)=>rev.rate==2).length * 0.4
//     let rev1 = productReviews.filter((rev)=>rev.rate==1).length * 0.2
    
  
//     let ratingCount = (rev5+rev4+rev3+rev2+rev1) 
//  rating=(ratingCount/revsCount) *5
// console.log( revsCount);

// }







    try {

        res.status(200).send({ product , Rate , productReviews })
    } catch (e) {
        res.status(400).send({ e })
    }
})


module.exports = router

