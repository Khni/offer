const auth = require('../middleware/auth')
const express = require('express')
const Viewed = require('../models/Viewed')
const Product= require('../models/Product')
const User= require('../models/User')
const router = new express.Router()





router.post('/api/viewed/add', auth, async (req, res) => {

    const ViewedItem =await Viewed.find({$and:[{productID: req.body.productID},{userID: req.user._id}]})
    if (ViewedItem) {
        await Viewed.deleteOne({$and:[{productID: req.body.productID},{userID: req.user._id}]})
        
    }
    const viewed = new Viewed({
        ...req.body,
        userID: req.user._id
        
    })

    try {
        await viewed.save()
        res.status(201).send({viewed})
    } catch (e) {
        res.status(400).send({e})
    }
})



router.get('/api/user-viewed', auth, async (req, res) => {

    const viewed = await Viewed.find({userID : req.user._id})
  

    let ViewedProducts = await Promise.all( viewed.map(async(v) => {
      
        return await Product.findById(v.productID)
    }))




    
// const products = await Product.find({})

// const viewedProducts = 
//     viewed.map((f)=>products.filter((p) => p._id == f.userID ))
    

    try {
        
        res.status(200).send({ViewedProducts})
    } catch (e) {
        res.status(400).send({e})
    }
})

module.exports = router

