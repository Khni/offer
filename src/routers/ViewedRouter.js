const auth = require('../middleware/auth')
const express = require('express')
const Viewed = require('../models/Viewed')
const Product= require('../models/Product')
const User= require('../models/User')
const router = new express.Router()
const auth = require('../middleware/auth')




router.post('/api/viewed/add', auth, async (req, res) => {
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
const products = await Product.find({})

const viewedProducts = 
    viewed.map((f)=>products.filter((p) => p._id == f.userID ))
    

    try {
        
        res.status(200).send({viewedProducts})
    } catch (e) {
        res.status(400).send({e})
    }
})

module.exports = router

