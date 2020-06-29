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
       
        const category = new Category({ })
category.sections = category.sections.concat({section : section._id})
        
        await category.save()
        res.status(201).send(section)
    } catch (e) {
        res.status(400).send(e)
    }
})


/*const category = new Category({ })
category.sections = category.sections.concat({section : section._id})
    try {
        await category.save()
       
        
        
        
       // res.status(201).send(section)
    } catch (e) {
        res.status(400).send(e)
    }
})*/



module.exports = router