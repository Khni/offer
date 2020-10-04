const express = require('express')
const User = require('../models/User')
const router = new express.Router()
const auth = require('../middleware/auth')
const passport = require('passport');
const oauth = require('../config/oauth.js');
const GooglePlusTokenStrategy = require('passport-google-plus-token')
const AuthPassport = require("./passport")
const routerPromise = require('express-promise-router')();
const UserController = require('../controllers/userController')
const {HandelErrors} = require('./userUtils')
const {ObjIndexToZero} require('./usersFuncs')
//post/create new user 
//
router.post('/api/signup', async (req, res) => {

    const email = req.body.email
    const password = req.body.password
    const username = req.body.username
    const repassword = req.body.repassword
    if (!email || !password) {
return res.status(403).json({
            error_en: 'You must provide Email and password', 
            error_ar: 'يجب أن تدخل بريد الكتروني ورقم سري' 
        });
       } 
    
    
    let userjson = await User.findOne({ "local.email": email })
    if (userjson) {
        return res.status(403).json({
            error_en: 'Email is already in use',
            error_ar: 'البريد الالكترونى مسجل مسبقا '
        });
        // return new Error('email is already exsist').status(403)
    }
    /*
  const usernamejs= await User.findOne({"local.username": username})
  if (usernamejs) {
      return res.status(403).json({ error: 'Username is already in use'});
    }*/

   
   

    if (password !== repassword) {
        return res.status(403).json({
            error_en: 'Password is not Match',
            error_ar: 'الرقم السري غير مطابق'
        });
    }



     userjson= await User.findOne( {
        $or: [
            { "google.email": email },
            { "facebook.email": email },
        ]
    });
     
    if (userjson) {
    	
        // merge them
        userjson.methods.push('local')
        userjson.local = {
        email: email, 
        password: password
      }

        try {
           await userjson.save()
            const token = await userjson.generateAuthToken()
           // res.status(201).send({ userjson, token })
           res.send({ userjson, token })
        } catch (e) {
            res.status(400).send(e.message)
        }

    }





    if (!userjson) {

        const user = new User({
            methods: ['local'],
            local: {
                email: email,
                password: password,
                
            }
            , ...req.body
        })
        try {
            await user.save()
            const token = await user.generateAuthToken()
         //   res.status(201).send({ user, token })
         res.send({ user, token })
        } catch (e) {

            res.status(400).send(HandelErrors(e.message))
            //   res.send('error')
        }
    }
})
//list of users
router.get('/api/users', async (req, res) => {
    try {
        const users = await User.find({})
        res.send(users)
    } catch (e) {
        // res.status(400).send(e)
        res.send('error')
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
router.get('/api/profile', auth, async (req, res) => {
    res.send(req.user)
})

//find user by id
router.get('/api/user/:id',(req,res) => {
    User.findById(req.params.id).then((user)=>{
       res.send(user)
    }).catch((e)=>{
       res.status(500).send(e)
    })
  
})


//update user
router.post('/api/user/update/:id',async(req,res) => {
	
	const filter = { _id: req.params.id};
const update = { "local.email": req.body.email, name:req.body.name};




try {
        let user = await User.findOneAndUpdate(filter, update, {
 // returnOriginal: false
 new: true
});
        res.send({ user})
    } catch (error) {
        //const userToLogin =await User.verifyLogin(req.body.email,req.body.password)
        res.status(400).send(error)
    }


  
})

//logout
router.get('/api/logout', auth, async (req, res) => {


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
router.get('/api/logoutall', auth, async (req, res) => {
    try {
        req.user.tokens = []
        await req.user.save()
        res.status(200).send()
    } catch (error) {
        res.status(500).send()
    }

})

//login (check of the username and password)
router.post('/api/login', async (req, res) => {
    const EmailInput = req.body.email
    const PasswordInput = req.body.password
    const DataLoginInput = Object.keys(req.body)
    const DataLoginMust = ['email', 'password']
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
    router.post('/api/users/login', async (req, res) => {
        try {
            const user = await User.findByCredentials(req.body.email, req.body.password)
            res.send(user)
        } catch (e) {
            res.status(400).send()
        }
    })
*/


    try {
        const user = await User.findByCredentials(EmailInput, PasswordInput)
        const token = await user.generateAuthToken()
        res.send({ user, token })
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

router.get('/api/user-addresses',auth ,(req, res) => {
    
    

    try {
        console.log("address");
        let user = req.user
        const addresses = user.addresses
        const defaultAddress = user.defaultAddress
        let addressesList  = ObjIndexToZero(addresses,defaultAddress)
        res.send({addressesList, defaultAddress});
      
    } catch (error) {
        //const userToLogin =await User.verifyLogin(req.body.email,req.body.password)
        res.status(400).send(error)
    }

	
    
})


router.get('/api/lists/list' , async (req, res)=>{

    try {
        const users = await User.find({})
        res.send({users});
    } catch (error) {
        res.status(400).send({error})
    }
   
})

router.post('/api/user-add-address', auth, async (req, res) => {




    try {
        
        let user = req.user
        console.log("name:"+user.name);
        user.addresses = user.addresses.concat( {
            country: "Egypt",
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            phone: req.body.phone,
            city: req.body.city,
            street: req.body.street,
            floor: req.body.floor,
            apartment: req.body.apartment
        
        } 
        )
            await user.save()
            const addresses =user.addresses
            //get last item in array
            const address = user.addresses.slice(-1).pop()
            user.defaultAddress = address
            await user.save()
            
            
            const defaultAddress = user.defaultAddress
        let addressesList  = ObjIndexToZero(addresses,defaultAddress)
        
        res.send({user,address, addressesList});
    } catch (error) {
        res.status(400).send({error});
    }


//   await  User.findById(req.params.id).then(async(user) => {
//         user.addresses = user.addresses.concat(
//             {firstName: req.body.firstName}
//             )
//             await user.save()
//         res.send({user});
//     }).catch((e) => {
//         res.status(400).send({e});

//     })

})







router.post('/api/user-add-defaultAddress', auth, async (req, res) => {




    try {
        
        let user = req.user
        console.log("name:"+user.name);
        user.defaultAddress = req.body
            await user.save()
            const defaultAddress =user.defaultAddress
            
            const addresses =user.addresses
            let addressesList  = ObjIndexToZero(addresses,defaultAddress)
        res.send({user,defaultAddress, addresses});
    } catch (error) {
        res.status(400).send({error});
    }

router.get('/api/admin/deleteuser/:id', (req, res) => {
	
	
	
    User.deleteOne({ _id: req.params.id }).then((user) => {
        res.send('succefully ' + user.count + 'member has been removed');
    }).catch((e) => {
        res.status(400).send(e);

    })
})





//google



routerPromise.route('/google/oauth')
    .post(passport.authenticate('googleToken', { session: false }), UserController.googleOAuth)



module.exports = { router, routerPromise } 
