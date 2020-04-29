const express = require('express')
const Cart= require('../models/Cart)
const router = new express.Router()
const auth = require('../middleware/auth')



router.post('/cart/add', auth, async (req, res) => {
    const cart = new Cart({
        ...req.body,
        userID: req.user._id
    })

    try {
        await cart.save()
        res.status(201).send(cart)
    } catch (e) {
        res.status(400).send(e)
    }
})


module.exports = router