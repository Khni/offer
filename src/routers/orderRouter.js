const express = require('express')
const Order= require('../models/Order')
const router = new express.Router()
const auth = require('../middleware/auth')



router.post('/api/order/add', auth, async (req, res) => {
    const order = new Order({
        ...req.body,
        userID: req.user._id,
        totalPrice: req.body.products.reduce((accumalatedQuantity, product) =>accumalatedQuantity + product.quantity * product.price , 0)
    })

    try {
        await order.save()
        res.status(201).send(order)
    } catch (e) {
        res.status(400).send({e})
    }
})


module.exports = router

