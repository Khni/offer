const express = require('express')

const Section = require('../models/Section')
const Product = require('../models/Product')

const deletePOS = async(req ,res , next) =>{
    try {
    	
    const product = await Product.findById(req.params.id)
        const section = await Section.findById(product.sectionID)
    
await Promise.all( section.productsOfSection.find((pos)=>pos.productOfSection=== req.params.id)) = undefined 
    await section.save()
    
    
    
    
    
    
    
    
        
        next()
    } catch (error) {
        res.status(401).send({ error: 'delete POS error .' })
        console.log(error);
        
    }
   
    
}



module.exports = deletePOS