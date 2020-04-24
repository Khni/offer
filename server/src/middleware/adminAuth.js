const express = require('express')
const Admin = require('../models/Admin')
const jwt = require('jsonwebtoken')

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
        next()
    } catch (error) {
        res.status(401).send({ error: 'Please authenticate.' })
        console.log(error);
        
    }
   
    
}



module.exports = authToken