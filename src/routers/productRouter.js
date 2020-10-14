const express = require('express')
const Product = require('../models/Product')
const Section = require('../models/Section')
const router = new express.Router()
const authAdmin = require('../middleware/adminAuth')
const auth = require('../middleware/auth')
const deletePOS = require('../middleware/deleteProductsOfSection.js')
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



router.post('/api/product/add', authAdmin, async (req, res) => {
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
	
	let rev5 = product.reviews.filter((rev)=>rev.rate==5).length 
    let rev4 = product.reviews.filter((rev)=>rev.rate==4).length * 0.8
    let rev3 = product.reviews.filter((rev)=>rev.rate==3).length * 0.6
    let rev2 = product.reviews.filter((rev)=>rev.rate==2).length * 0.4
    let rev1 = product.reviews.filter((rev)=>rev.rate==1).length * 0.2
    
    let revsCount = product.reviews.length
    let ratingCount = (rev5+rev4+rev3+rev2+rev1) 
let rating=(ratingCount/revsCount) *5
if(rating== null) {
	rating=0
	} 

    


    try {
   res.status(201).send({product, rating})
        
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
      bucket: 'juvkhaled/productsimgs',
      metadata: function (req, file, cb) {
        cb(null, {fieldName: file.fieldname});
      },
      contentType: multerS3.AUTO_CONTENT_TYPE,
      key: function (req, file, cb) {
        cb(null, Date.now().toString()+ ".png")
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





router.post('/api/add/product',[authAdmin , upload.single('upload') ] , async (req, res) => {
    const product = new Product({
        ...req.body,
        adminID: req.admin._id
    })
    
    let imgUrlPath =  req.file.key
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

router.post('/api/uploadpic/product/:id',[authAdmin , upload.single('upload') ] , async (req, res) => {
    const product = await Product.findById(req.params.id)
    
    let imgUrlPath =  req.file.key
    product.imgURLs = product.imgURLs.concat({imgURL: imgUrlPath}) 
      
     
    try {

        await product.save()
        



        
        res.status(201).send({product})
    } catch (e) {
        res.status(400).send(e)
    }
})

router.delete('/api/product/delete/:id', [authAdmin, deletePOS] , async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id)
        if (!product) {
            res.status(404).send()
        }

        res.send(product)
        
    } catch (e) {
        res.status(500).send()
    }
})


//add comments 
router.post('/api/product/add-comment/:id',auth,  async (req, res) => {
	
	let product = await Product.findOne({_id: req.params.id})
	let review =  req.body
    product.reviews = product.reviews.concat({title: review.title,
    rate: review.rate,
    comment: review.comment,
    userName : req.user.name, 
userID: req.user._id, 
active: false

}) 
  
	console.log("review"+review.title);
    //product.review.userID = req.user._id

    try {
       await   product.save()
   res.status(201).send(product.reviews)
        
    } catch (e) {
        res.status(400).send(e)
    }
})
//fetch product review 
router.get('/api/product-reviews/find/:id',  async (req, res) => {
	
	let product = await Product.findOne({_id: req.params.id})
	let reviews = product.reviews
	
    

    try {
   res.status(201).send({reviews})
        
    } catch (e) {
        res.status(400).send(e)
    }
})


//hide product
router.post('/api/hide-product/:id',authAdmin , async (req, res) => {
    const product = await Product.findById(req.params.id)
    
    product.active = false;
      
     
    try {

        await product.save()
        res.status(201).send({product})
    } catch (e) {
        res.status(400).send(e)
    }
})

/* APPROVE REVIEW*/
router.post('/api/approve-product-review/:id',authAdmin , async (req, res) => {
    
     
    try {
      
const product =await Product.update({"_id": req.params.id, "reviews._id": req.body.reviewID}, 
{$set: {"reviews.$.active": true}},
    { safe: true },
    function publishReview(err, obj) {
     console.log("obj"+JSON.stringify(obj));
    })    
        product.save()
    } catch (error) {
        res.status(401).send({ error: 'activate review POS error .' })
        console.log(error);
        
    }
   
    
})


/* HIDE REVIEW*/
router.post('/api/hide-product-review/:id',authAdmin , async (req, res) => {
    
     
    try {
      
const product =await Product.update({"_id": req.params.id, "reviews._id": req.body.reviewID}, 
{$set: {"reviews.$.active": false}},
    { safe: true },
    function publishReview(err, obj) {
     console.log("obj"+JSON.stringify(obj));
    })    
        product.save()
    } catch (error) {
        res.status(401).send({ error: 'activate review POS error .' })
        console.log(error);
        
    }
   
    
})
/*add or remove favorite if it already exists */
router.get('/api/favorite-toggle/:id',auth , async (req, res) => {
    
  const checkFavorite = await Product.findOne({$and: [{_id: req.params.id}, {"favorites.userID" : req.user._id}]})
  
   
 
    if(checkFavorite) {
       
       try {
    
  await Product.update( 
    { _id: req.params.id },
    { $pull: { favorites : { userID : req.user._id  } } },
    { safe: true },
    function removeConnectionsCB(err, obj) {
       
    
    });
    
    return res.status(200).send("done deleted")
 } catch (error) {
    return res.status(400).send({error: error})
 }
 
       
      } 



      const product = await Product.findById(req.params.id)
   
      product.favorites = product.favorites.concat({userID: req.user._id}) 
      
     
    try {

        await product.save()
        
        res.status(201).send({ product})
    } catch (e) {
        res.status(400).send(e)
    }
})



//fetch favorite users
router.get('/api/user-favorites-list', auth, async (req, res) => {
    const UserFavorites = await Product.find({"favorites.userID" : req.user._id})
  



    try {
        
        res.status(200).send({UserFavorites})
    } catch (e) {
        res.status(400).send({e})
    }
})







/*seen product */
router.get('/api/product-seen/:id',auth , async (req, res) => {
    
  const checkSeen = await Product.findOne({$and: [{_id: req.params.id}, {"seen.userID" : req.user._id}]})
  
   
 
    if(checkSeen) {
       //remove and add it again to renew it
       try {
    await Product.update( 
    { _id: req.params.id },
    { $pull: { seen : { userID : req.user._id  } } },
    { safe: true },
    function removeConnectionsCB(err, obj) {
       
    
    });
          const product = await Product.findById(req.params.id)
   
      product.seen = product.seen.concat({userID: req.user._id}) 
      await product.save()
    
    return res.status(200).send("seen renewed ")
 } catch (error) {
    return res.status(400).send({error: error})
 }
 
       
      } 



      const product = await Product.findById(req.params.id)
   
      product.seen = product.seen.concat({userID: req.user._id}) 
      
     
    try {

        await product.save()
        
        res.status(201).send({ product})
    } catch (e) {
        res.status(400).send(e)
    }
})



//fetch seen for user
router.get('/api/products-seen-list', auth, async (req, res) => {
    const SeenProducts = await Product.find({"seen.userID" : req.user._id})
  



    try {
        
        res.status(200).send({SeenProducts})
    } catch (e) {
        res.status(400).send({e})
    }
})

module.exports = router