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

router.post('/cart/update', auth, async (req, res) => {
   
const cartID = await req.body.cartID
const cart = Cart.find({_id: CartID})
const productNames=cart.products.productName.filter(name =>{return name==req.body.product.productName});
const productName = productNames.map(n => return n) 
if (productName.length>0){
   return cart.products.quantity = cart.products.quantity + req.body.products.quantity;
}
cart.products= cart.products.concat({...req.body})

 

    try {
        await cart.save()
        res.status(201).send(cart)
    } catch (e) {
        res.status(400).send(e)
    }
})



module.exports = router