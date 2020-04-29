const express = require('express')
const Section= require('../models/Section)
const router = new express.Router()
const auth = require('../middleware/adminAuth')



router.post('/section/add', auth, async (req, res) => {
    const section = new Section({
        ...req.body,
        adminID: req.admin._id
    })

    try {
        await section.save()
        res.status(201).send(section)
    } catch (e) {
        res.status(400).send(e)
    }
})

module.exports = router