const express = require('express')
const Order = require('../models/Order')
const router = new express.Router()
const auth = require('../middleware/auth')
const authAdmin = require('../middleware/adminAuth')
const User = require('../models/User')
const Product = require('../models/Product')


router.post('/api/order/add', auth, async (req, res) => {
	
	await Promise.all(req.body.map(async (product) => {
           let outOfStock=[] 
            let MainProduct = await Product.findById(product._id)
            if (MainProduct.availableQty < product.quantity) {
              outOfStock.concat({outOfStock: MainProduct.nameEn+ "only" + product.quantity "Qty in Stock" } )
              } 
           if(outOfStock) {
         return   res.status(400).send({ outOfStock })
            } 

       
        }))
	
	
    const order = new Order({
        ...req.body,
        orderNum: new Date().valueOf(),
        userID: req.user._id,
        products: req.body,
        status: "inProcessing",
        defaultAddress: req.user.defaultAddress,
        totalPrice: req.body.reduce((accumalatedQuantity, product) => accumalatedQuantity + product.quantity * product.price, 0)
    })

    order.history =  order.history.concat({operation: "order has been placed"})

    try {
        await order.save()
        await Promise.all(order.products.map(async (product) => {
           
            let MainProduct = await Product.findById(product._id)


            
            MainProduct.reservedQty = MainProduct.reservedQty + product.quantity
            MainProduct.availableQty = MainProduct.availableQty - product.quantity


            await MainProduct.save()
        }))

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

if (order.status === "inProcessing" && req.body.status ==="Picked" ) {
try {
        order.status = "Picked" 

        order.save()
        
        
        await Promise.all(order.products.map(async (product) => {
           
            let MainProduct = await Product.findById(product._id)


            MainProduct.onHandQty = MainProduct.onHandQty - product.quantity
            MainProduct.reservedQty = MainProduct.reservedQty - product.quantity
            MainProduct.pickedQty = MainProduct.pickedQty + product.quantity


            await MainProduct.save()
        }))
        
        
        
        res.status(201).send({ order })

    } catch (e) {
        res.status(400).send(e)
    }
} 



if (order.status === "Picked" && req.body.status ==="Shipped" ) {
try {
        order.status = "Shipped" 

        order.save()
        
        
        await Promise.all(order.products.map(async (product) => {
           
            let MainProduct = await Product.findById(product._id)


            
            MainProduct.pickedQty = MainProduct.pickedQty - product.quantity
            MainProduct.shippedQty = MainProduct.shippedQty + product.quantity

            


            await MainProduct.save()
        }))
        
        
        
        
        
        res.status(201).send({ order })

    } catch (e) {
        res.status(400).send(e)
    }
} 




if (order.status === "Shipped" && req.body.status ==="Delivered" ) {
try {
        order.status = "Delivered" 

        order.save()
        
        
        await Promise.all(order.products.map(async (product) => {
           
            let MainProduct = await Product.findById(product._id)


            
            MainProduct.deliveredQty = MainProduct.deliveredQty + product.quantity
            MainProduct.shippedQty = MainProduct.shippedQty - product.quantity

            


            await MainProduct.save()
        }))
        
        
        res.status(201).send({ order })

    } catch (e) {
        res.status(400).send(e)
    }
} 

    
})



router.get('/api/user/order/find/:id', auth, async (req, res) => {

    let order = await Order.findOne({ _id: req.params.id })



    try {

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

