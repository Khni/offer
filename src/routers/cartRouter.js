const express = require('express')
const Cart = require('../models/Cart')
const router = new express.Router()
const auth = require('../middleware/auth')



router.post('/api/cart/add', auth, async (req, res) => {
    const foundcart = await Cart.findOne({ userID: req.user._id })

    if (foundcart) {
        console.log("foundcart" + foundcart);
        const foundproduct = await Cart.findOne({ $and: [{ userID: req.user._id }, { "products.productID": req.body.productID }] })

        //console.log("foundproduct" + foundproduct.products);
        if (foundproduct) {
            const product = foundproduct.products.find(product => {


                return product.productID == req.body.productID

            })

            try {

                const updatecart = await Cart.updateOne({ "userID": req.user._id, "products.productID": req.body.productID },
                    { $set: { "products.$.quantity": product.quantity + 1 } },
                    { safe: true })
                return res.status(200).send({ updatecart })
                // updatecart.save()
            } catch (error) {
                return res.status(401).send({ error })


            }

        }// if found product 

        //if product doesn't exist 
        foundcart.products = foundcart.products.concat({ productID: req.body.productID, quantity: 1 })
        try {
            await foundcart.save()
            res.status(201).send(foundcart)
        } catch (error) {
            res.status(400).send(error)
        }
    } //if found cart 

    //if cart nor product are exist 
    const cart = new Cart({
        userID: req.user._id
    })
    cart.products = cart.products.concat({ productID: req.body.productID, quantity: req.body.quantity })
    try {
        await cart.save()
        res.status(201).send(cart)
    } catch (e) {
        res.status(400).send(e)
    }
})


router.post('/api/cart/decrease', auth, async (req, res) => {
   
    const foundproduct = await Cart.findOne({ $and: [{ userID: req.user._id }, { "products.productID": req.body.productID }] })
    //validate that cart and product are fount toperform decreasing
    console.log("foundproduct" + foundproduct);
    if (foundproduct) {

        const product = foundproduct.products.find(product => {


            return product.productID == req.body.productID

        })
        console.log("product" + product.productID );

        if (product.quantity === 1) {
            try {

                const updatecart = await Cart.updateOne({ "userID": req.user._id, "products.productID": req.body.productID }, 
                { $pull: { products:{productID: product.productID}  } });
               
                return res.status(200).send()



                // const updatecart = await Cart.updateOne({ "userID": req.user._id, "products.productID": req.body.productID },
                //     { $pull: { "products.productID": product.productID } })
               // return res.status(200).send({ updatecart })
                // updatecart.save()
            } catch (error) {
                return res.status(401).send({ error })


            }
        }






        try {

            const updatecart = await Cart.updateOne({ "userID": req.user._id, "products.productID": req.body.productID },
                { $set: { "products.$.quantity": product.quantity - 1 } },
                { safe: true })
            return res.status(200).send({ updatecart })
            // updatecart.save()
        } catch (error) {
            return res.status(401).send({ error })


        }
    }else{
        return res.status(400).send({ error : "product is not found"})
    }



})









// router.post('/api/cart/update', auth, async (req, res) => {

// const cartID = await req.body.cartID
// const cart = Cart.find({_id: CartID})
// const productNames=cart.products.productName.filter(name =>{return name==req.body.product.productName});
// const productName = productNames.map(n => return n) 
// if (productName.length>0){
//    return cart.products.quantity = cart.products.quantity + req.body.products.quantity;
// }
// cart.products= cart.products.concat({...req.body})



//     try {
//         await cart.save()
//         res.status(201).send(cart)
//     } catch (e) {
//         res.status(400).send(e)
//     }
// })



module.exports = router