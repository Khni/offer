const express = require('express')
const Product = require('../models/Product')
const Section = require('../models/Section')
const router = new express.Router()
const authHigherAdmin = require('../middleware/higherAdminAuth')
const auth = require('../middleware/auth')
const deletePOS = require('../middleware/deleteProductsOfSection.js')


/" PRODUCTS DELETE AND approvals */

/* APPROVE PRODUCT ADDING */
router.post('/api/approve-product/:id',authHigherAdmin , async (req, res) => {
    const product = await Product.findById(req.params.id)
    
    product.active = true;
      
     
    try {

        await product.save()
        res.status(201).send({product})
    } catch (e) {
        res.status(400).send(e)
    }
})



/** DELETE PRODUCT PERMANENTLY **/
/*
router.delete('/api/product/delete/:id', [authHigherAdmin, deletePOS] , async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id)
        if (!product) {
            res.status(404).send()
        }

        res.send(product)
        
    } catch (e) {
        res.status(500).send()
    }
})
*/



