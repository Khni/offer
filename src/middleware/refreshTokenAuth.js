const express = require('express')
const User = require('../models/User')
const jwt = require('jsonwebtoken')






const authToken = async(req ,res , next) =>{

    const refreshtToken = req.header('Authorization').replace('Bearer ','')
    
if (!refreshtToken) {
    return res.status(401).send({ message: "Refresh token not found, login again" })
       
  }
  try {
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
 console.log("usertoken"+user.refreshToken);
 console.log("usertoken out"+refreshtToken);
 if (user.refreshToken != refreshtToken ) {
       await logOut(user)
     return res.status(401).send({ error: "LOG USER OUT"})
  }
  
  
  
  

      const tokens = await user.generateAuthToken()

     
      res.status(201).send({ user, token: tokens.token, refreshToken: tokens.refreshToken })
  } catch (e) {
 console.log(e);

 //if it expired or token in invalid 
      res.status(401).send({ error: 'unauthenticated end' })
      
  }
  
   
    
}



module.exports = authToken