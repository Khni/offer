const express = require('express')
const Section= require('../models/Section')
const Category = require('../models/Category')
const router = new express.Router()
const auth = require('../middleware/adminAuth')



router.post('/section/add', auth, async (req, res) => {
    const section = new Section({
        ...req.body,
        adminID: req.admin._id
    })

    try {
        await section.save()
       const relatedCategory = await Category.findOne({_id: req.body.categoryID})
       
     relatedCategory.sectionsOfCategory = relatedCategory.sectionsOfCategory.concat({sectionOfCategory : section._id})
        
       await relatedCategory.save()
        res.status(201).send(relatedCategory)
    } catch (e) {
        res.status(400).send(e)
    }
})






module.exports = router