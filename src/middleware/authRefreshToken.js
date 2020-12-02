const express = require('express')
const User = require('../models/User')
const jwt = require('jsonwebtoken')

const authToken = async(req ,res , next) =>{
    try {
        const token = req.body.token
        
        console.log("token" +token);
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
    	const refreshtToken = req.header('Authorization').replace('Bearer ','')
        console.log("refreshToken" + refreshtToken);
        //expired TokenExpiredError
        //invaild JsonWebTokenError
        
        //if token expired
        if(error.name=='TokenExpiredError' ) {
if (!refreshtToken) {
      return res.status(401).send({ message: "Refresh token not found, login again" })
         
    }
    
    const decoded = jwt.verify(refreshtToken, 'refreshToken')
    const user = await User.findOne({ _id: decoded._id})
    
     if (!user) {
        res.status(401).send({ error: "invalid token" })

    }
    //logout function
    const logOut = async (user) => {
       // log the user out coz someone used the real refresh token ,,
       //token may be leaked
      user.refreshToken = ''
      user.tokens = []
      await user.save()
      
   }
   
   if (user.refreshToken != refreshtToken ) {
         await logOut(user)
       return res.status(401).send({ error: "log user out"})
    }
    
    
    
    try {

        const tokens = await user.generateAuthToken()

       
        res.status(201).send({ user, token: tokens.token, refreshToken: tokens.refreshToken })
    } catch (e) {
   console.log(e);

   //if it expired or token in invalid 
        res.status(401).send({ error: 'unauthenticated end' })
        
    }
    
    
    
    
       } //if token expired
        
        
        
        //if the token invalid not just expired 
        res.status(401).send({ error: 'unauthenticated invalid token' })
        
    }
   
    
}



module.exports = authToken