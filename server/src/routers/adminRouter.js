const express = require('express')
const Admin = require('../models/Admin')
const router = new express.Router()
const auth = require('../middleware/adminAuth')



router.post('/admin/add', async (req,res)=>{
     const DataLoginInput = Object.keys(req.body)
    const DataLoginMust = ['email', 'verifypassword', 'adminname', 'phone', 'password', 'personalCardId' ]
    const isValidOperation = DataLoginInput.every((LoginInput) => DataLoginMust.includes(LoginInput))
    
    if (!isValidOperation) {
    return res.send('invalid operation!');
    } 
    
    const email = req.body.email
    const adminname = req.body.adminname
    const adminjson = await Admin.findOne({email: email})
    if (adminjson) {
        return res.send('Email is already exit!')
      }
    const adminnamejs= await Admin.findOne({adminname: adminname})
    if (adminnamejs) {
        return res.send('Adminname is already exit!')
      }
    
    
     
  
    
     //check verifypass to approve adding new admin
     const verifyPass = await req.body.verifypassword;
    const isValid = await Admin.verifyAdmin(verifyPass);
     if (!isValid) {
     return res.send('invalid operation');
    } 
    
    const admin = new Admin(req.body)
    try {
        await admin.save()
      const token = await admin.generateAuthToken()
        res.status(201).send({admin, token})
    } catch (e) {
        res.status(400).send(e)
    }
    
     

})

router.post('/admin/login', async (req,res)=>{
       const EmailInput = req.body.email
    const PasswordInput = req.body.password
    const DataLoginInput = Object.keys(req.body)
    const DataLoginMust = ['email','password']
    const isValidOperation = DataLoginInput.every((LoginInput) => DataLoginMust.includes(LoginInput))
    const MustProvideData = DataLoginMust.every((LoginMust) => DataLoginInput.includes(LoginMust)) 
        
    
    if (!isValidOperation) {
        return res.status(400).send('The request is only accept Email and Password Keys')
    }
    if (!MustProvideData) {
        if (DataLoginInput.includes('email')) {
            return res.status(400).send('You have to Provide Password')
         }
         if (DataLoginInput.includes('password')) {
            return res.status(400).send('You have to Provide Email')
         }

        return res.status(400).send('You have to Provide Email and Password')
    }




    


   try {
       const adminToLogin =await Admin.loginVerify(EmailInput,PasswordInput)
       const token = await adminToLogin.generateAuthToken()
       res.send({adminToLogin , token})
   } catch (error) {
        console.log(error);
        
       res.status(400).send(error)
   }


   
})
router.get('/admin/profile' , auth, async (req,res) =>{
    res.send(req.admin)
})

router.post('/admins',async (req,res) => {
	
	const DataLoginInput = Object.keys(req.body)
    const DataLoginMust = ['verifypassword']
    const isValidOperation = DataLoginInput.every((LoginInput) => DataLoginMust.includes(LoginInput))
    
    if (!isValidOperation) {
    return res.send('invalid operation!');
    } 
    
      //check verifypass to approve showing Admin list 
     const verifyPass = await req.body.verifypassword;
    const isValid = await Admin.verifyAdmin(verifyPass);
     if (!isValid) {
     return res.send('invalid operation');
    } 
	
    
   try {
    const admins = await Admin.find({})
    res.send(admins)
   } catch (e) {
    res.status(400).send(e)
   }
  })
  
  //logout
router.get('/admin/logout', auth , async (req,res)=>{

   
    try {
        req.admin.tokens = req.admin.tokens.filter((token) => {
            return token.token !== req.token
        })
        await req.admin.save()

        res.send()
    } catch (e) {
        res.status(500).send()
    }

})

//logout from all sesions
router.get('/admin/logoutall' , auth , async(req,res)=>{
    try {
        req.admin.tokens = []
     await req.admin.save()
     res.status(200).send()
    } catch (error) {
        res.status(500).send()
    } 
    
})

module.exports = router