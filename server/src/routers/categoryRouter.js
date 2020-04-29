const express = require('express')
const Category= require('../models/Category)
const router = new express.Router()
const auth = require('../middleware/adminAuth')



router.post('/category/add', auth, async (req, res) => {
    const category = new Category({
        ...req.body,
        adminID: req.admin._id
    })

    try {
        await category.save()
        res.status(201).send(category)
    } catch (e) {
        res.status(400).send(e)
    }
})
module.exports = router