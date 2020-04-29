const express = require('express')
const Order= require('../models/Order)
const router = new express.Router()
const auth = require('../middleware/auth')



router.post('/order/add', auth, async (req, res) => {
    const order = new Order({
        ...req.body,
        userID: req.user._id
    })

    try {
        await order.save()
        res.status(201).send(cart)
    } catch (e) {
        res.status(400).send(e)
    }
})


module.exports = router