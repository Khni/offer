const express = require('express')
const Cart = require('../models/Cart')
const router = new express.Router()
const Product = require('../models/Product')

const auth = require('../middleware/auth')



router.post('/api/cart/add', auth, async (req, res) => {
    const foundcart = await Cart.findOne({ userID: req.user._id })

    if (foundcart) {
        console.log("foundcart" + foundcart);
        const foundproduct = await Cart.findOne({ $and: [{ userID: req.user._id }, { "products.productID": req.body.productID }] })

        //console.log("foundproduct" + foundproduct.products);
        if (foundproduct) {








            //find the product in cart to get its Qty in cart
            const productinCart = foundproduct.products.find(product => {


                return product.productID == req.body.productID

            })
            //check if product onlyOrderAvailableQty to stop adding if it out of stock
            let product = await Product.findOne({ _id: req.body.productID })
            if (product.onlyOrderAvailableQty) {
                if (product.availableQty === 0 || product.availableQty < 0) {
                    return res.status(400).send({
                        error: "There are no more in stock",
                        error_ar: "ليس هناك مخزون كافي لاضافة المزيد"
                    })
                }
            }

            //check if there is discount and there are limited number to buy
            if (product.discount.isActive && product.discount.limitedOrder !== 0) {
                if (product.discount.limitedOrder === productinCart.quantity || product.discount.limitedOrder < productinCart.quantity) {
                    return res.status(400).send({
                        error: "You Reached maximum amount in Discount",
                        error_ar: "وصلت للحد الأقصى في وقت العرض"
                    })
                }
            }





            try {

                const updatecart = await Cart.updateOne({ "userID": req.user._id, "products.productID": req.body.productID },
                    { $set: { "products.$.quantity": productinCart.quantity + 1 } },
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
            return res.status(201).send(foundcart)
        } catch (error) {
            return res.status(400).send(error)
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
        console.log("product" + product.productID);

        if (product.quantity === 1) {
            try {

                const updatecart = await Cart.updateOne({ "userID": req.user._id, "products.productID": req.body.productID },
                    { $pull: { products: { productID: product.productID } } });

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
    } else {
        return res.status(400).send({ error: "product is not found" })
    }



})



//delete product from cart
router.post('/api/cart/deleteproduct', auth, async (req, res) => {

    const foundproduct = await Cart.findOne({ $and: [{ userID: req.user._id }, { "products.productID": req.body.productID }] })
    //validate that cart and product are fount toperform decreasing
    console.log("foundproduct" + foundproduct);
    if (foundproduct) {

        const product = foundproduct.products.find(product => {


            return product.productID == req.body.productID

        })
        console.log("product" + product.productID);

        try {

            const updatecart = await Cart.updateOne({ "userID": req.user._id, "products.productID": req.body.productID },
                { $pull: { products: { productID: product.productID } } });

            return res.status(200).send()

        } catch (error) {
            return res.status(401).send({ error })


        }
    } else {
        return res.status(400).send({ error: "product is not found" })
    }



})





router.post('/api/cart/mergelocal', auth, async (req, res) => {

    let localCart = req.body.products
    let serverCart = await Cart.findOne({ userID: req.user._id })
    if (serverCart) {

        localCart = localCart.filter((elem) =>
            !serverCart.products.find((product) => elem.productID == product.productID))


        serverCart.products = serverCart.products.concat(localCart)
        try {

            await serverCart.save()
            return res.status(200).send({ serverCart })

        } catch (error) {
            return res.status(401).send({ error })


        }
    } else {
        const cart = new Cart({
            userID: req.user._id,
            products: req.body.products
        })
        try {

            await cart.save()
            return res.status(200).send({ cart })

        } catch (error) {
            return res.status(401).send({ error })


        }
    }





})




router.get('/api/user/servercart', auth, async (req, res) => {

    let cart = await Cart.findOne({ userID: req.user._id })
    if (!cart) {
        return res.status(400).send({ error: "cart is not found" })
    }

    let cartWithProducts = await Promise.all(cart.products.map(async product => {

        const foundproduct = await Product.findById(product.productID)
        if (foundproduct) {
            
                 	let price = foundproduct.price
            let Qty = product.quantity
        
        
        
        if (foundproduct.onlyOrderAvailableQty) {
                if (foundproduct.availableQty < product.quantity ) {
                    Qty = foundproduct.availableQty
                }
            }

            //check if there is discount and there are limited number to buy
            if (foundproduct.discount.isActive && foundproduct.discount.limitedOrder !== 0) {
                if (foundproduct.discount.limitedOrder < Qty ) {
                    Qty = foundproduct.discount.limitedOrder
                }
            }
     
            
            
            
            
            
            
            
        /*    if (foundproduct.availableQty === 0 && foundproduct.onlyOrderAvailableQty) {
                price = 0,
                    Qty = 0

            }
            if (foundproduct.availableQty < Qty && foundproduct.onlyOrderAvailableQty) {

                Qty = foundproduct.availableQty

            }*/


            return {
                ...product.toObject(),
                price: price,
                nameEn: foundproduct.nameEn,
                nameAr: foundproduct.nameAr,
                availableQty: foundproduct.availableQty,
                Qty: Qty
            }

        } //end of if foundproduct

    }))




    try {


        return res.status(200).send({ cartWithProducts })

    } catch (error) {
        return res.status(401).send({ error })


    }



})








router.post('/api/user/localcart', async (req, res) => {

    let cart = req.body.cart
    if (!cart) {
        return res.status(400).send({ error: "cart is not found" })
    }

    let cartWithProducts =await Promise.all( cart.map(async product => {

        const foundproduct = await Product.findById(product.productID)
        
        if (foundproduct) {
        	let price = foundproduct.price
            let Qty = product.quantity
        
        
        
        if (foundproduct.onlyOrderAvailableQty) {
                if (foundproduct.availableQty < product.quantity ) {
                    Qty = foundproduct.availableQty
                }
            }

            //check if there is discount and there are limited number to buy
            if (foundproduct.discount.isActive && foundproduct.discount.limitedOrder !== 0) {
                if (foundproduct.discount.limitedOrder < Qty ) {
                    Qty = foundproduct.discount.limitedOrder
                }
            }
        
      
           

            return {
                
                price: price,
                _id: foundproduct._id,
                nameEn: foundproduct.nameEn,
                nameAr: foundproduct.nameAr,
                availableQty: foundproduct.availableQty,
                quantity: Qty,
                imgURLs: foundproduct.imgURLs,
                discount: foundproduct.discount,
                onlyOrderAvailableQty: foundproduct.onlyOrderAvailableQty
            }

        } //end of if foundproduct

    }))




    try {


        return res.status(200).send({ cartWithProducts })

    } catch (error) {
        return res.status(401).send({ error })


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