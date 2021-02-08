const express = require('express')
const Cart= require('../models/Cart)
const router = new express.Router()
const auth = require('../middleware/auth')



router.post('/api/cart/add', auth, async (req, res) => {
	const foundcart = Cart.findOne({userID: req.user._id})
	if(foundcart) {

const foundproduct = foundcart.products.find(product=> product.productID=== req.body.productID)
if(foundproduct) {
try {
      
const updateproduct =await Cart.update({"userID": req.user._id, "products.productID": req.body.productID}, 
{$set: {"products.$.quantity": products.quantity +1}},
    { safe: true },
    function publishReview(err, obj) {
     console.log("obj"+JSON.stringify(obj));
    })    
        updateproduct.save()
    } catch (error) {
        res.status(401).send({ error: 'activate review POS error .' })
        console.log(error);
        
    }

}// if found product 

//if product doesn't exist 
foundcart.products = foundcart.products.concat({productID:req.body.productID, quantity: 1})
} //if found cart 

  //if cart nor product are exist 
    const cart = new Cart({
        userID: req.user._id
    })
cart.products = cart.products.concat({productID:req.body.productID, quantity: 1})
    try {
        await cart.save()
        res.status(201).send(cart)
    } catch (e) {
        res.status(400).send(e)
    }
})


router.post('/api/cart/remove', auth, async (req, res) => {
	const foundcart = Cart.findOne({userID: req.user._id})
	if(foundcart) {

const foundproduct = foundcart.products.find(product=> product.productID=== req.body.productID)
if(foundproduct) {
try {
      
const updateproduct =await Cart.update({"userID": req.user._id, "products.productID": req.body.productID}, 
{$set: {"products.$.quantity": products.quantity - 1}},
    { safe: true },
    function publishReview(err, obj) {
     console.log("obj"+JSON.stringify(obj));
    })    
        updateproduct.save()
    } catch (error) {
        res.status(401).send({ error: 'activate review POS error .' })
        console.log(error);
        
    }

}// if found product 

//if product doesn't exist 
foundcart.products = foundcart.products.concat({productID:req.body.productID, quantity: 1})
} //if found cart 

  //if cart nor product are exist 
    const cart = new Cart({
        userID: req.user._id
    })
cart.products = cart.products.concat({productID:req.body.productID, quantity: 1})
    try {
        await cart.save()
        res.status(201).send(cart)
    } catch (e) {
        res.status(400).send(e)
    }
})









router.post('/api/cart/update', auth, async (req, res) => {
   
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