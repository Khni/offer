const express = require('express')
const Product = require('../models/Product')
const router = new express.Router()
const auth = require('../middleware/adminAuth')


router.post('/product/add', auth, async (req, res) => {
    const product = new Product({
        ...req.body,
        adminID: req.admin._id
    })
    product.imgURLs = product.imgURLs.concat({imgURL: req.body.imgURL}) 
     product.pricehistory = product.pricehistory.concat({price: req.body.price}) 
     
    try {
        await product.save()
        res.status(201).send(product)
    } catch (e) {
        res.status(400).send(e)
    }
})


module.exports = router