const express = require('express')
const User = require('../models/User')
const router = new express.Router()
const auth = require('../middleware/auth')
const passport = require('passport');
const oauth = require('../config/oauth.js');
const GooglePlusTokenStrategy = require('passport-google-plus-token')
const AuthPassport = require("./passport")
const routerPromise = require('express-promise-router')();
const userController = require('../controllers/userController')

//post/create new user 
//
router.post('/signup', async (req,res)=>{

    const email = req.body.email
    const username = req.body.username
    const userjson = await User.findOne({"local.email": email})
    if (userjson) {
        return res.send('Email is already exit!')
      }
    const usernamejs= await User.findOne({"local.username": username})
    if (usernamejs) {
        return res.send('Username is already exit!')
      }

      const password = req.body.password
      const repassword = req.body.repassword

      if (password !== repassword) {
        return res.send('Password is not match')
      }
      
      
      
      foundUser = await User.findOne({ 
      $or: [
        { "google.email": email },
        { "facebook.email": email },
      ] 
    });
    if (foundUser) {
      // Let's merge them?
      foundUser.methods.push('local')
      foundUser={
       local: {
        email: email, 
        password: password, 
        username: username
      }
          ,...req.body}
          
          try {
        await foundUser.save()
        const token = await foundUser.generateAuthToken()
        res.status(201).send({foundUser, token})
    } catch (e) {
        res.status(400).send(e)
    }
      
     } 
      
      
      
      
      
      if (!foundUser){
    
    const user = new User({
    	methods: ['local'],
      local: {
        email: email, 
        password: password, 
        username: username
      }
          ,...req.body})
    try {
        await user.save()
        const token = await user.generateAuthToken()
        res.status(201).send({user, token})
    } catch (e) {
        res.status(400).send(e)
    }
   } 
})
//list of users
router.get('/users',async (req,res) => {
   try {
    const users = await User.find({})
    res.send(users)
   } catch (e) {
    res.status(400).send(e)
   }

  
    
/*
    User.find({}).then((users)=>{
       res.send(users)
    }).catch((e)=>{
       res.status(400).send(e)
    })
*/
  
})

 //profile from AuthToken
 router.get('/profile' , auth, async (req,res) =>{
    res.send(req.user)
})
/*
//find user by id
router.get('/users/:id',(req,res) => {
    User.findById(req.params.id).then((user)=>{
       res.send(user)
    }).catch((e)=>{
       res.status(500).send(e)
    })
  
})
*/

//logout
router.get('/logout', auth , async (req,res)=>{

   
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token
        })
        await req.user.save()

        res.send()
    } catch (e) {
        res.status(500).send()
    }

})

//logout from all sesions
router.get('/logoutall' , auth , async(req,res)=>{
    try {
        req.user.tokens = []
     await req.user.save()
     res.status(200).send()
    } catch (error) {
        res.status(500).send()
    } 
    
})

//login (check of the username and password)
router.post('/login',async (req,res)=>{
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




    /*
    router.post('/users/login', async (req, res) => {
        try {
            const user = await User.findByCredentials(req.body.email, req.body.password)
            res.send(user)
        } catch (e) {
            res.status(400).send()
        }
    })
*/    


   try {
       const userToLogin =await User.findByCredentials(EmailInput,PasswordInput)
       const token = await userToLogin.generateAuthToken()
       res.send({userToLogin , token})
   } catch (error) {
    //const userToLogin =await User.verifyLogin(req.body.email,req.body.password)
       res.status(400).send(error)
   }


/*
  try {
   //--- verifyLogin




    //------
    const user = await User.findOne({email: EmailInput})
    console.log(EmailInput,PasswordInput)
    
    if (!user) {
        return res.send('Email is not Found')
    }
    const PasswordDB = user.password
    console.log('database pass is'+PasswordDB+ 'and password input is'+PasswordInput)
    if (PasswordDB !== PasswordInput) {
        return res.send('Password in incorrect')
    }
    
    if (PasswordDB == PasswordInput) {
        return res.send('Weclome '+ user.name)
    } 
    
  } catch (e) {
      return res.send(e)
  }

  */
    

  
   /*
    User.findOne({email: req.body.email}).then((user)=>{
     if (!user) {
        return res.send('Email is not found Sign Up Please')
     }
     
     if (user.password != req.body.password) {
       return res.send('password is incorrect!')
     }
     if (user.password = req.body.password) {
        return res.send('Welcome' + user.name)
     }
        res.send('please provide the email and the password')
     
    }).catch((e)=>{

    })
    */
})

router.get('/admin/removeuser/:id',(req,res)=>{
   User.deleteOne({_id: req.params.id}).then((user)=>{
           res.send('succefully '+user.count+ 'member has been removed');
   }).catch((e)=>{
           res.status(400).send(e);
   })
})



//google



routerPromise.route('/google/oauth').post(passport.authenticate('googleToken'),userController.googleOAuth)



module.exports = router
