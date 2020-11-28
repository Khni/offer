const express = require('express')
const User = require('../models/User')
const jwt = require('jsonwebtoken')

const authToken = async(req ,res , next) =>{
    try {
        
        const token = req.header('Authorization').replace('Bearer ','')
        
        const decoded = jwt.verify(token, 'secret')
        //send another status if token expired to refresh it
        const user = await User.findOne({ _id: decoded._id, 'tokens.token': token })
      
        if (!user) {
            throw new Error()
        }
        req.token = token
        req.user = user
        
        next()
    } catch (error) {
        res.status(401).send({ error: 'Please authenticate.' })
        console.log(error);
        
    }
   
    
}



module.exports = authToken