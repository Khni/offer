const auth = require('../middleware/auth')
const express = require('express')
const Favorite= require('../models/Favorite')
const Product= require('../models/Product')
const User= require('../models/User')
const router = new express.Router()
const auth = require('../middleware/auth')




router.post('/api/favorite/add', auth, async (req, res) => {
    const favorite = new Favorite({
        ...req.body,
        userID: req.user._id
        
    })

    try {
        await favorite.save()
        res.status(201).send({favorite})
    } catch (e) {
        res.status(400).send({e})
    }
})



router.get('/api/user-favorites', auth, async (req, res) => {
    const favorites = await Favorite.find({userID : req.user._id})
const products = await Product.find({})

const favoriteProducts = 
    favorites.map((f)=>products.filter((p) => p._id == f.userID ))
    

    try {
        
        res.status(200).send({favoriteProducts})
    } catch (e) {
        res.status(400).send({e})
    }
})

module.exports = router

