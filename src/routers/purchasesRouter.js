const express = require('express')
const Purchase = require('../models/Purchase')
const Product = require('../models/Product')
const router = new express.Router()

const authAdmin = require('../middleware/adminAuth')
const User = require('../models/User')

router.post('/api/admin/purchase/add', async (req, res) => {



    const purchase = new Purchase({
        ...req.body,
        purchaseNum: new Date().valueOf(),
        //supplierID: req.user._id,
        products: req.body,
        status: "ordered",
        

        totalPrice: req.body.reduce((accumalatedQuantity, product) => accumalatedQuantity + product.quantity * product.price, 0)
    })
    purchase.history =  purchase.history.concat({operation: "purchase has been placed"})

    try {
        await purchase.save()
        await Promise.all(req.body.map(async (product) => {
            let MainProduct = await Product.findById(product._id)


            MainProduct.onOrderQty = product.quantity + MainProduct.onOrderQty


            await MainProduct.save()
        }))




        res.status(201).send({ purchase })
    } catch (e) {
        res.status(400).send({ e: e })
    }
})



router.get('/api/admin/purchase/cancel/:id', async (req, res) => {


    let purchase = await Purchase.findOne({ _id: req.params.id })
   
    if (purchase.status !== "ordered") {
        return res.status(201).send({ msg: "order prder can not be canceled because it has been shipped" })
    }

    try {



        console.log("started");
        await Promise.all(purchase.products.map(async (product) => {
           
            let MainProduct = await Product.findById(product._id)


            
            MainProduct.onOrderQty = MainProduct.onOrderQty - product.quantity


            await MainProduct.save()
        }))
       // await Purchase.deleteOne({ _id: req.params.id })
       purchase.status = "canceled"
       purchase.history =  purchase.history.concat({operation: "purchase has been canceled"})
        res.status(201).send({ msg: "order canceled" })

    } catch (e) {
        res.status(400).send(e)
    }
})









router.get('/api/admin/purchase/intransit/:id', async (req, res) => {

    let purchase = await Purchase.findOne({ _id: req.params.id })
    if (purchase.status !== "ordered") {
        return res.status(201).send({ msg: "operation can not done" })
    }



    try {
        purchase.status = "inTransit"
        purchase.history =  purchase.history.concat({operation: "Purchase is in Transit"})

        purchase.save()

        await Promise.all(purchase.products.map(async (product) => {
            let MainProduct = await Product.findById(product._id)


            MainProduct.transitQty = product.quantity + MainProduct.transitQty
            MainProduct.onOrderQty = MainProduct.onOrderQty - product.quantity


            await MainProduct.save()
        }))


        res.status(201).send({ purchase })

    } catch (e) {
        res.status(400).send(e)
    }
})




router.get('/api/admin/purchase/instock/:id', async (req, res) => {

    let purchase = await Purchase.findOne({ _id: req.params.id })
    if (purchase.status !== "inTransit") {
        return res.status(201).send({ msg: "operation can not done" })
    }

    try {
        purchase.status = "inStock"
        purchase.history =  purchase.history.concat({operation: "Purchase is in Stock"})

        purchase.save()

        await Promise.all(purchase.products.map(async (product) => {
            let MainProduct = await Product.findById(product._id)


            MainProduct.availableQty = product.quantity + MainProduct.availableQty
            MainProduct.onHandQty = product.quantity + MainProduct.onHandQty
            MainProduct.transitQty = MainProduct.transitQty - product.quantity


            await MainProduct.save()
        }))


        res.status(201).send({ purchase })

    } catch (e) {
        res.status(400).send(e)
    }
})

//this router for upgrade database by updating all records
router.get('/api/admin/upgradedb', async (req, res) => {
   // let update = {onOrderQty:0, transitQty:0 , availableQty:0 , onHandQty:0 , reservedQty:0,
//     pickedQty:0, shippedQty:0 , deliveredQty:0

// }
//  let update = {history:[]}
// let update = {
//   discount: {

//     isActive: false,
//     inPercentage: false,
//     value: 0,
//     limitedOrder: 0


//   },
//   onlyOrderAvailableQty: false
// }
let update = {
    discountValue : 10,
    inPercentage: false,
    barcode: 0,
    limitedOrder: 15,
    sku:"N/A"
   
  }

await Product.updateMany({}, update)


    try {
      

        res.status(201).send({ msg: "done" })

    } catch (e) {
        res.status(400).send(e)
    }
})



router.post('/api/admin/purchase/returned', async (req, res) => {



    const returnedPurchase = new Purchase({
        ...req.body,
        purchaseNum: new Date().valueOf(),
        //supplierID: req.user._id,
        products: req.body,
        status: "returned",

        totalPrice: req.body.reduce((accumalatedQuantity, product) => accumalatedQuantity + product.quantity * product.price, 0)
    })

    try {
        await returnedPurchase.save()
        await Promise.all(req.body.map(async (product) => {
            let MainProduct = await Product.findById(product._id)

            MainProduct.availableQty = MainProduct.availableQty - product.quantity
            MainProduct.onHandQty = MainProduct.onHandQty - product.quantity

            await MainProduct.save()
        }))




        res.status(201).send({ returnedPurchase })
    } catch (e) {
        res.status(400).send({ e: e })
    }
})


// router.get('/api/user-orders', auth, async (req, res) => {
//     const orders = await Order.find({ userID: req.user._id })

//     try {

//         res.status(200).send({ orders })
//     } catch (e) {
//         res.status(400).send({ e })
//     }
// })

// router.get('/api/admin/orders/:status', authAdmin, async (req, res) => {
//     if (req.params.status == 'all') {
//         const orders = await Order.find({})

//         try {

//             res.status(200).send({ orders })
//         } catch (e) {
//             res.status(400).send({ e })
//         }

//     } else {
//         const orders = await Order.find({ status: req.params.status })

//         try {

//             res.status(200).send({ orders })
//         } catch (e) {
//             res.status(400).send({ e })
//         }
//     }
// })


// router.get('/api/admin/order/find/:id', authAdmin, async (req, res) => {

//     let order = await Order.findOne({ _id: req.params.id })



//     try {

//         res.status(201).send({ order })

//     } catch (e) {
//         res.status(400).send(e)
//     }
// })





// router.get('/api/user/order/find/:id', auth, async (req, res) => {

//     let order = await Order.findOne({ _id: req.params.id })



//     try {

//         res.status(201).send({ order })

//     } catch (e) {
//         res.status(400).send(e)
//     }
// })



module.exports = router

