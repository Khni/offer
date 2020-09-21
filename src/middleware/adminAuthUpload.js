const express = require('express')
const Admin = require('../models/Admin')
const jwt = require('jsonwebtoken')
const multer = require('multer')

const authToken = async(req ,res , next) =>{
    try {
        const token = req.header('Authorization').replace('Bearer ','')
        const decoded = jwt.verify(token, 'secret')
        const admin = await Admin.findOne({ _id: decoded._id, 'tokens.token': token })
      
        if (!admin) {
            throw new Error()
        }
        req.token = token
        req.admin = admin
        
        
        
        var storage = multer.diskStorage({
    destination: function (req, file, cb) {
    cb(null, 'uploads/products')
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
  })

  var upload = multer({ storage: storage })
        
        
        upload.single('upload')
        
        
        next()
    } catch (error) {
        res.status(401).send({ error: 'Please authenticate.' })
        console.log(error);
        
    }
   
    
}



module.exports = authToken