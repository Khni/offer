const express = require('express')
const Collection= require('../models/Collection')
//const Category = require('../models/Category')
const router = new express.Router()
const auth = require('../middleware/adminAuth')



router.post('/api/collection/add', auth, async (req, res) => {
    const collection = new Collection({
        ...req.body,
        adminID: req.admin._id
    })

    try {
        await collection.save()
   //    const relatedCategory = await Category.findOne({_id: req.body.categoryID})
       
  //   relatedCategory.collectionsOfCategory = relatedCategory.collectionsOfCategory.concat({collectionOfCategory : collection._id})
        
    //   await relatedCategory.save()
        res.status(201).send({collection})
    } catch (e) {
        res.status(400).send(e)
    }
})



router.get('/api/collections',  async (req, res) => {
	
	let collections = await Collection.find({})
	
	
    

    try {
   res.status(201).send({collections})
        
    } catch (e) {
        res.status(400).send(e)
    }
})






module.exports = router