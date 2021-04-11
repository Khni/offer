const express = require('express')
const Section= require('../models/Section')
const Product = require('../models/Product')
const Category = require('../models/Category')
const router = new express.Router()
const auth = require('../middleware/adminAuth')



router.post('/api/section/add', auth, async (req, res) => {
    const section = new Section({
        ...req.body,
        adminID: req.admin._id
    })

    try {
        await section.save()
       const relatedCategory = await Category.findOne({_id: req.body.categoryID})
       
     relatedCategory.sectionsOfCategory = relatedCategory.sectionsOfCategory.concat({sectionOfCategory : section._id})
        
       await relatedCategory.save()
        res.status(201).send({section})
    } catch (e) {
        res.status(400).send(e)
    }
})



router.get('/api/sections-with-products',  async (req, res) => {
	console.log("ooo");
	let sections = await Section.find({})
	
	/*let SectionsWithProducts = await Promise.all(sections.map(async(section) => {
        return {...section.toObject(), productsOfSection: await Promise.all(section.productsOfSection.map(async(pos)=>{
            return Product.findOne({_id: pos.productOfSection})
        }))}
    }))*/
    
    
    let SectionsWithProducts = await Promise.all(sections.map(async(section) => {
        return {...section.toObject(), productsOfSection: await Promise.all(section.productsOfSection.map(async(pos)=>{
        	let product =await Product.findOne({_id: pos.productOfSection})
            if(product){
        let outOfStock = false
	if (product.onlyOrderAvailableQty) {
        console.log(product.nameEn);
         if (product.availableQty === 0 || product.availableQty < 0) {
             outOfStock = true
         }
     }
     product = {...product.toObject(), outOfStock: outOfStock} 
     console.log("outOfStock: "+ product.outOfStock);
    if(!product.outOfStock) {
        return product
       } 


    }
      } )) }
    }))

      //every product is out of stock will return as null , so this will be  filtering the products to remove null projects
    SectionsWithProducts = await Promise.all(SectionsWithProducts.map(section=>{


        return{...section ,  productsOfSection: section.productsOfSection.filter(p => p != null) }
    })) 
    

    try {
   res.status(201).send({SectionsWithProducts})
        
    } catch (e) {
        res.status(400).send(e)
    }
})


router.get('/api/sections',  async (req, res) => {
	
	let sections = await Section.find({})
	
	
    

    try {
   res.status(201).send({sections})
        
    } catch (e) {
        res.status(400).send(e)
    }
})










module.exports = router