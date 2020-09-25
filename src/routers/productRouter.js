const express = require('express')
const Product = require('../models/Product')
const Section = require('../models/Section')
const router = new express.Router()
const auth = require('../middleware/adminAuth')
const authUploadProduct = require('../middleware/adminAuthUpload')
var aws = require('aws-sdk')

var multer = require('multer')
var multerS3 = require('multer-s3')
aws.config.update({
    secretAccessKey: 'UhV9jBH3AFlNYJaqKK43mIURzQLUeE7naDmTgc24',
    accessKeyId: 'AKIAVHDPNUJVSRX7XEHO',
    region: 'us-west-1'
});
var s3 = new aws.S3()



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
/*const upload = multer({

   destination: function (req, file, cb) {
    cb(null, 'uploads')
  },
 
  filename: function (req, file, cb) {
   // cb(null, file.fieldname + '-' + Date.now()+'.png')
    cb(null, "atofile")
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
})*/

/*var storage = multer.diskStorage({
    destination: function (req, file, cb) {
    cb(null, 'uploads')
  },
 
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now()+'.png')
    //cb(null, "atofile")
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
  })*/

  

  //var upload = multer({ storage: storage })
  var upload = multer({
    storage: multerS3({
      s3: s3,
      bucket: 'some-bucket',
      metadata: function (req, file, cb) {
        cb(null, {fieldName: file.fieldname});
      },
      key: function (req, file, cb) {
        cb(null, Date.now().toString())
      }
    })
  })

/*router.post('/api/product/upload', upload.single('upload'), (req, res) => {
let imgUrlPath = req.file.destination+'/' +req.file.filename
let path = req.file.path
    res.send({name})
}, (error, req, res, next) => {
    res.status(400).send({ error: error.message })
}) */





router.post('/api/add/product',[auth , upload.single('upload') ] , async (req, res) => {
    const product = new Product({
        ...req.body,
        adminID: req.admin._id
    })
    
    let imgUrlPath = 'imgs/' +req.file.filename
    product.imgURLs = product.imgURLs.concat({imgURL: imgUrlPath}) 
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




module.exports = router