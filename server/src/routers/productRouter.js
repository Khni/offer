const express = require('express')
const Product = require('../models/Product')
const router = new express.Router()
const auth = require('../middleware/adminAuth')


router.post('/product/add', auth, async (req, res) => {
    const product = new Product({
        ...req.body,
        adminID: req.admin._id
        imgURLs.concat({imgURL}) 
    })

    try {
        await product.save()
        res.status(201).send(product)
    } catch (e) {
        res.status(400).send(e)
    }
})


module.exports = router