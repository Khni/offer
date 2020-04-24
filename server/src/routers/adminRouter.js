const express = require('express')
const Admin = require('../models/Admin')
const router = new express.Router()
const auth = require('../middleware/auth')



router.post('/admins/add', async (req,res)=>{

    const verifyPass = await req.body.verifypassword;
     
    /* const email = req.body.email;
     const password = req.body.password;
     const adminname = req.body.adminname;
     const phone = req.body.phone;*/
    
     const admin = new Admin(req.body)
    const isValid = await Admin.verifyAdmin(verifyPass);
     if (!isValid) {
     return res.send('invalid operation');
    } 
    try {
        await admin.save()
      const token = await admin.generateAuthToken()
        res.status(201).send({admin, token})
    } catch (e) {
        res.status(400).send(e)
    }
    
     

})

module.exports = router