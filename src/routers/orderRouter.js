const express = require('express')
const Order= require('../models/Order')
const router = new express.Router()
const auth = require('../middleware/auth')
const authAdmin =  require('../middleware/adminAuth')



router.post('/api/order/add', auth, async (req, res) => {
    const order = new Order({
        ...req.body,
        orderNum:  new Date().valueOf() ,
         userID: req.user._id,
        products: req.body,
        status: "unconfirmed",
       totalPrice: req.body.reduce((accumalatedQuantity, product) =>accumalatedQuantity + product.quantity * product.price , 0)
    })

    try {
        await order.save()
        res.status(201).send({order})
    } catch (e) {
        res.status(400).send({e})
    }
})

router.get('/api/user-orders', auth, async (req, res) => {
    const orders = await Order.find({userID : req.user._id})

    try {
        
        res.status(200).send({orders})
    } catch (e) {
        res.status(400).send({e})
    }
})

router.get('/api/admin/orders:status', authAdmin, async (req, res) => {
    const orders = await Order.find({status: req.params.status})

    try {
        
        res.status(200).send({orders})
    } catch (e) {
        res.status(400).send({e})
    }
})

router.get('/api/admin/orders', authAdmin, async (req, res) => {
    const orders = await Order.find({})

    try {
        
        res.status(200).send({orders})
    } catch (e) {
        res.status(400).send({e})
    }
})

module.exports = router

