const express = require('express')
const Order = require('../models/Order')
const router = new express.Router()
const auth = require('../middleware/auth')
const authAdmin = require('../middleware/adminAuth')
const User = require('../models/User')


router.post('/api/order/add', auth, async (req, res) => {
    const order = new Order({
        ...req.body,
        orderNum: new Date().valueOf(),
        userID: req.user._id,
        products: req.body,
        status: "unconfirmed",
        defaultAddress: req.user.defaultAddress,
        totalPrice: req.body.reduce((accumalatedQuantity, product) => accumalatedQuantity + product.quantity * product.price, 0)
    })

    try {
        await order.save()

        order.address = req.user.defaultAddress
        await order.save()
        
        
        /*
        
        const product = Product
     req.body.map((p)=> 
     {
     	return
   try{
   	const product = Product.findById(p._id)
   //    const product = Product.update({_id:p._id},{quantity: p.quantity+ quantity} ) 
   product.quantity = product.quantity +p.quantity 
   product.orderd = product.orderd.concat({userID: req.user._id, quantity: p.quantity )
       product.save()
       if(product.quantity < 3) {
       	//send email to administrator 
     } 
       }catch(e){
       	console.log(e) 
       }
    ) 
   }    
        */
        
        
        
        res.status(201).send({ order })
    } catch (e) {
        res.status(400).send({ e })
    }
})

router.get('/api/user-orders', auth, async (req, res) => {
    const orders = await Order.find({ userID: req.user._id })

    try {

        res.status(200).send({ orders })
    } catch (e) {
        res.status(400).send({ e })
    }
})

router.get('/api/admin/orders/:status', authAdmin, async (req, res) => {
    if (req.params.status == 'all') {
        const orders = await Order.find({})

        try {

            res.status(200).send({ orders })
        } catch (e) {
            res.status(400).send({ e })
        }

    } else {
        const orders = await Order.find({ status: req.params.status })

        try {

            res.status(200).send({ orders })
        } catch (e) {
            res.status(400).send({ e })
        }
    }
})


router.get('/api/admin/order/find/:id', authAdmin, async (req, res) => {

    let order = await Order.findOne({ _id: req.params.id })



    try {

        res.status(201).send({ order })

    } catch (e) {
        res.status(400).send(e)
    }
})


router.post('/api/admin/order/updatestatus/:id', authAdmin, async (req, res) => {

    let order = await Order.findOne({ _id: req.params.id })


    try {
        order.status = req.body.status

        order.save()
        res.status(201).send({ order })

    } catch (e) {
        res.status(400).send(e)
    }
})

// router.get('/api/admin/orders', authAdmin, async (req, res) => {
//     const orders = await Order.find({})

//     try {

//         res.status(200).send({orders})
//     } catch (e) {
//         res.status(400).send({e})
//     }
// })

module.exports = router

