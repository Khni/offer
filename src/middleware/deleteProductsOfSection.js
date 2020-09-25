const express = require('express')

const Section = require('../models/Section')
const Product = require('../models/Product')

const deletePOS = async(req ,res , next) =>{
    try {
    	
    let product = await Product.findById(req.params.id)
    let section = await Section.findById(product.sectionID)
 // await  section.productsOfSection.pull({ productOfSection: req.params.id })

 // await  Section.updateOne( {_id: product._id}, { $pullAll: {productsOfSection: [req.params.id] } } )
       // let section = await Section.findById(product.sectionID)
       // section.set('productsOfSection'=== req.params.id), undefined, {strict: false} );
//section.productsOfSection.find((pos)=>pos.productOfSection=== req.params.id) = undefined 
   // await section.save()
    
    
    
    
    
    
    
    
        
        next()
    } catch (error) {
        res.status(401).send({ error: 'delete POS error .' })
        console.log(error);
        
    }
   
    
}



module.exports = deletePOS