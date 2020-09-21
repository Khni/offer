const express = require('express')
const Product = require('../models/Product')
const Section = require('../models/Section')
const router = new express.Router()
const auth = require('../middleware/adminAuth')
const multer = require('multer')
router.post('/api/product/add', auth, async (req, res) => {
    const product = new Product({
        ...req.body,
        adminID: req.admin._id
    })
    product.imgURLs = product.imgURLs.concat({imgURL: req.body.imgURL}) 
     product.pricehistory = product.pricehistory.concat({price: req.body.price}) 
     
    try {

        await product.save()
        const relatedSection = await Section.findOne({_id: req.body.sectionID})
        
        relatedSection.productsOfSection =  relatedSection.productsOfSection.concat({productOfSection : product._id})
         
        await relatedSection.save()






        
        res.status(201).send({product})
    } catch (e) {
        res.status(400).send(e)
    }
})



router.get('/api/products',  async (req, res) => {
	
	let products = await Product.find({})
	
	
    

    try {
   res.status(201).send({products})
        
    } catch (e) {
        res.status(400).send(e)
    }
})

router.get('/api/product/find/:id',  async (req, res) => {
	
	let product = await Product.findOne({_id: req.params.id})
	
	
    

    try {
   res.status(201).send({product})
        
    } catch (e) {
        res.status(400).send(e)
    }
})

//photos upload
const upload = multer({
    destination: function (req, file, cb) {
    cb(null, '/tmp/uploads')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now()+'.png')
  }, 
    limits: {
        fileSize: 2000000
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(png|jpg)$/)) {
            return cb(new Error('Please upload a photo png or jpg'))
        }

        cb(undefined, true)
    }
})
router.post('/upload', upload.single('upload'), (req, res) => {
    res.send()
}, (error, req, res, next) => {
    res.status(400).send({ error: error.message })
})



module.exports = router