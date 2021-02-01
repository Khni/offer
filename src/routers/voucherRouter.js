const auth = require('../middleware/adminAuth')
const authHiegher =require('../middleware/higherAdminAuth')
const express = require('express')
const Viewed = require('../models/Viewed')
const Product= require('../models/Product')
const User= require('../models/User')
const Voucher = require('../models/Voucher')
const router = new express.Router()





router.post('/api/voucher/create',  async (req, res) => {

   
    const voucher = new Voucher({
        ...req.body,
        isEnabled: false
        //userID: req.user._id
        
    })

    try {
        await voucher.save()
        res.status(201).send({voucher})
    } catch (e) {
        res.status(400).send({e})
    }
})



// router.get('/api/user-viewed', auth, async (req, res) => {

//     const viewed = await Viewed.find({userID : req.user._id})
  

//     let ViewedProducts = await Promise.all( viewed.map(async(v) => {
      
//         return await Product.findById(v.productID)
//     }))




    
// // const products = await Product.find({})

// // const viewedProducts = 
// //     viewed.map((f)=>products.filter((p) => p._id == f.userID ))
    

//     try {
        
//         res.status(200).send({ViewedProducts})
//     } catch (e) {
//         res.status(400).send({e})
//     }
// })

module.exports = router

