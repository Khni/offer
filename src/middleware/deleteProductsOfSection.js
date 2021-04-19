const express = require('express')

const Section = require('../models/Section')
const Product = require('../models/Product')

const deletePOS = async(req ,res , next) =>{
    try {
      
     let product = await Product.findById(req.params.id)

 await Section.update( 
    { _id: product.sectionID },
    { $pull: { productsOfSection : { productOfSection : req.params.id } } },
    { safe: true },
    function removeConnectionsCB(err, obj) {
     //   console.log("obj"+JSON.stringify(obj));
    });
 

        
        next()
    } catch (error) {
        res.status(401).send({ error: 'delete POS error .' })
        console.log(error);
        
    }
   
    
}



module.exports = deletePOS