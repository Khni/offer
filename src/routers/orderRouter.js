const express = require('express')
const Order = require('../models/Order')
const router = new express.Router()
const auth = require('../middleware/auth')
const authAdmin = require('../middleware/adminAuth')
const User = require('../models/User')
const Product = require('../models/Product')
const Voucher = require('../models/Voucher')
require("dotenv").config();
const sendEmail = require('../middleware/nodeMailer');


router.post('/api/order/add', auth, async (req, res) => {
    let outOfStock = []

    await Promise.all(req.body.products.map(async (product) => {

        let MainProduct = await Product.findById(product._id)


        if (MainProduct.onlyOrderAvailableQty) {
            if (MainProduct.availableQty < product.quantity) {
                outOfStock = outOfStock.concat({ _id: MainProduct._id, Qty: MainProduct.availableQty, Ordered: product.quantity })
            }
        }







    }))
    if (outOfStock.length > 0) {
        //frontend should redirect to a cart which will update the order list
        return res.status(400).send({
            outOfStock,
            error_ar: " لا يوجد مخزون كافي لبعض المنتجات ",
            error: "there is not enough stock for some products"
        })
    }
    let totalPrice = req.body.products.reduce((accumalatedQuantity, product) => accumalatedQuantity + product.quantity * product.price, 0)


    if (req.body.voucherUsed) {

        let voucher = await Voucher.findOne({ code: req.body.voucherCode })


        let dateForm = new Date(voucher.validFrom)
        let dateuntil = new Date(voucher.validUntil)
        // let date = new Date(req.body.date)
        let DateNow = new Date()
        console.log("nowdate" + DateNow.getTime());
        console.log("until" + dateuntil.getTime());


        if (dateuntil.getTime() < DateNow.getTime()) {
            return res.status(400).send({
                error: "Voucher is Expired",
                error_ar: "قسيمة الشراء منتهية"
            })
        }

        const timesToUse = voucher.timesToUse

        const timesUserUsed = voucher.usersApplied.filter(list => list.userID === req.body.userID)
        if (timesToUse === timesUserUsed || timesToUse < timesUserUsed) {
            return res.status(400).send({
                error: "You have reached maximum times of using this Voucher",
                error_ar: "تخطيت الحد المسموح لاستخدام هذه القسيمة"
            })

        }

        if (!voucher.allUsers) {
            const user = voucher.validList.find(list => list.userID === req.body.userID)
            return res.status(400).send({
                error: "You can not use this voucher",
                error_ar: "لا يمكنك استخدام هذه القسيمة"
            })
        }

        if (!voucher.allProducts) {
            const product = voucher.selectedProducts.find(list => list.productsID === req.body.productID)
            if (!product) {
                return res.status(400).send({
                    error: "The voucher can not used for this product",
                    error_ar: " لا يمكنك استخدام هذه القسيمة مع هذا المنتج "
                })
            }
        }

        if (!voucher.discount.inPercentage) {
            totalPrice = totalPrice - voucher.discount.value
        }
        if (voucher.discount.inPercentage) {
            totalPrice = totalPrice * voucher.discount.value// percent will be in this form 0.90 means 10%
        }

        voucher.usersApplied = voucher.usersApplied.concat({ userID: req.user._id })

        await voucher.save()

    }




    const order = new Order({

        orderNum: new Date().valueOf(),
        userID: req.user._id,
        products: req.body.products,
        status: "inProcessing",
        defaultAddress: req.user.defaultAddress,
        totalPrice: totalPrice
    })






    order.history = order.history.concat({ operation: "order has been placed" })

    //here i will take the voucher id to concate user id in usersApplied

    let email = req.user.local.email
    if (!email) {
        email = req.user.google.email
    }
    if (!email) {
        email = req.user.facebook.email
    }

    await sendEmail({
        subject: "Juvni.com || Order #" + order.orderNum + " is Placed ",
        text: "Thanks for Trusting us, Your order is waiting for Confirmation. ",
        to: email,
        //  to: req.user.local.email,
        from: process.env.EMAIL
    });

    try {
        await order.save()
        //await voucher.save()
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

    if (order.status === "inProcessing" && req.body.status === "Picked") {
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

            order.history = order.history.concat({ operation: "Order Has Been Picked" })
            const user =  await User.findById(order.userID)
            let email = user.local.email
            if (!email) {
                email = user.google.email
            }
            if (!email) {
                email = user.facebook.email
            }

            await sendEmail({
                subject: "Juvni.com || Order #" + order.orderNum + " is Picked ",
                text: "Your order is Picked. ",
                to: email,
                //  to: req.user.local.email,
                from: process.env.EMAIL
            });

            res.status(201).send({ order })

        } catch (e) {
            res.status(400).send(e)
        }
    }



    if (order.status === "Picked" && req.body.status === "Shipped") {
        try {
            order.status = "Shipped"

            order.save()


            await Promise.all(order.products.map(async (product) => {

                let MainProduct = await Product.findById(product._id)



                MainProduct.pickedQty = MainProduct.pickedQty - product.quantity
                MainProduct.shippedQty = MainProduct.shippedQty + product.quantity




                await MainProduct.save()
            }))



            order.history = order.history.concat({ operation: "Order Has Been Shipped" })

            const user =  await User.findById(order.userID)
            let email = user.local.email
            if (!email) {
                email = user.google.email
            }
            if (!email) {
                email = user.facebook.email
            }

            await sendEmail({
                subject: "Juvni.com || Order #" + order.orderNum + " is out for delivery ",
                text: "Your order is out for delivery. ",
                to: email,
                //  to: req.user.local.email,
                from: process.env.EMAIL
            });

            res.status(201).send({ order })

        } catch (e) {
            res.status(400).send(e)
        }
    }




    if (order.status === "Shipped" && req.body.status === "Delivered") {
        try {
            order.status = "Delivered"

            order.save()


            await Promise.all(order.products.map(async (product) => {

                let MainProduct = await Product.findById(product._id)



                MainProduct.deliveredQty = MainProduct.deliveredQty + product.quantity
                MainProduct.shippedQty = MainProduct.shippedQty - product.quantity




                await MainProduct.save()
            }))

            order.history = order.history.concat({ operation: "Order Has Been Delivered" })
            const user =  await User.findById(order.userID)
            let email = user.local.email
            if (!email) {
                email = user.google.email
            }
            if (!email) {
                email = user.facebook.email
            }

            await sendEmail({
                subject: "Juvni.com || Order #" + order.orderNum + " Has Been Delivered ",
                text: "Your order Has Been Delivered. ",
                to: email,
                //  to: req.user.local.email,
                from: process.env.EMAIL
            });

            res.status(201).send({ order })

        } catch (e) {
            res.status(400).send(e)
        }
    }


})



//cancel and return customer order

router.post('/api/admin/order/cancelandreturn/:id', authAdmin, async (req, res) => {

    let order = await Order.findOne({ _id: req.params.id })

    if (order.status === "inProcessing") {
        try {
            order.status = "canceled"

            order.save()


            await Promise.all(order.products.map(async (product) => {

                let MainProduct = await Product.findById(product._id)


                MainProduct.reservedQty = MainProduct.reservedQty - product.quantity
                MainProduct.availableQty = MainProduct.availableQty + product.quantity




                await MainProduct.save()
            }))

            order.history = order.history.concat({ operation: "canceledAfterProcessing" })

            res.status(201).send({ order })

        } catch (e) {
            res.status(400).send(e)
        }
    }



    if (order.status === "Picked") {
        try {
            order.status = "cancelled"

            order.save()


            await Promise.all(order.products.map(async (product) => {

                let MainProduct = await Product.findById(product._id)

                MainProduct.onHandQty = MainProduct.onHandQty + product.quantity
                MainProduct.availableQty = MainProduct.availableQty + product.quantity
                MainProduct.pickedQty = MainProduct.pickedQty - product.quantity









                await MainProduct.save()
            }))



            order.history = order.history.concat({ operation: "cancelledAfterPicked" })

            res.status(201).send({ order })

        } catch (e) {
            res.status(400).send(e)
        }
    }




    if (order.status === "Shipped") {
        try {
            order.status = "returnedinTransit"

            order.save()


            await Promise.all(order.products.map(async (product) => {

                let MainProduct = await Product.findById(product._id)



                MainProduct.returnedinTransitQty = MainProduct.returnedinTransitQty + product.quantity
                MainProduct.shippedQty = MainProduct.shippedQty - product.quantity




                await MainProduct.save()
            }))

            order.history = order.history.concat({ operation: "returnedAfterShipping-inTransit" })

            res.status(201).send({ order })

        } catch (e) {
            res.status(400).send(e)
        }
    }



    if (order.status === "Delivered") {
        try {
            order.status = "returnedinTransit"

            order.save()


            await Promise.all(order.products.map(async (product) => {

                let MainProduct = await Product.findById(product._id)



                MainProduct.returnedinTransitQty = MainProduct.returnedinTransitQty + product.quantity
                MainProduct.deliveredQty = MainProduct.deliveredQty - product.quantity




                await MainProduct.save()
            }))

            order.history = order.history.concat({ operation: "returnedAfterDelivered-inTransit" })

            res.status(201).send({ order })

        } catch (e) {
            res.status(400).send(e)
        }
    }




    if (order.status === "returnedinTransit") {
        try {
            order.status = "returned"

            order.save()


            await Promise.all(order.products.map(async (product) => {

                let MainProduct = await Product.findById(product._id)



                MainProduct.returnedinTransitQty = MainProduct.returnedinTransitQty - product.quantity
                MainProduct.onHandQty = MainProduct.onHandQty + product.quantity
                MainProduct.availableQty = MainProduct.availableQty + product.quantity



                await MainProduct.save()
            }))

            order.history = order.history.concat({ operation: "returned" })

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

