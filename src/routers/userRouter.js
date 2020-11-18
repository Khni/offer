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
const {InsertSocialUser, userSignUp} = require('../controllers/userRouterController.js')
const { HandelErrors } = require('./userUtils')
const { ObjIndexToZero } = require('./usersFuncs')
const validator = require('validator')
var geoip = require('geoip-lite');
var google = require('googleapis').google;
var OAuth2 = google.auth.OAuth2;
var oauth2Client = new OAuth2();
//post/create new user 
//
router.post('/api/user-signup', async (req, res) => await  userSignUp(req, res) )






router.post('/api/signup', async (req, res) => {

    const email = req.body.email
    const password = req.body.password
    const username = req.body.username
    const repassword = req.body.repassword
    if (!validator.isEmail(email)) {
        return res.status(403).json({
            error_en: 'Email is invalid',
            error_ar: 'الايميل غير صحيح'
        });
    }

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



    userjson = await User.findOne({
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
                 const tokens = await user.generateAuthToken()
            
            res.send({ userjson, token :tokens.token, refreshToken: tokens.refreshToken})
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
            const tokens = await user.generateAuthToken()
            
            res.send({ user, token :tokens.token, refreshToken: tokens.refreshToken})
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
router.get('/api/user/:id', (req, res) => {
    User.findById(req.params.id).then((user) => {
        res.send(user)
    }).catch((e) => {
        res.status(500).send(e)
    })

})


//update user
router.post('/api/user/update', auth, async (req, res) => {
    const email = req.body.email

    if (!validator.isEmail(email)) {
        return res.status(403).json({
            error_en: 'Email is invalid',
            error_ar: 'الايميل غير صحيح'
        });
    }


    let user = await User.findOne({ "local.email": email })
    if (user && req.user.local.email !== email) {
        return res.status(403).json({
            error_en: 'Email is already in use',
            error_ar: 'البريد الالكترونى مسجل مسبقا '
        });

    }
    let userphone = await User.findOne({ phone: req.body.phone })
    console.log("ss" + userphone);
    console.log("req" + req.body.phone);
    if (userphone && req.user.phone !== req.body.phone) {
        return res.status(403).json({
            error_en: 'Phone is already in use',
            error_ar: 'الهاتف مسجل مسبقا لمستخدم اخر'
        });

    }

    const filter = { _id: req.user._id };
    const update = { "local.email": req.body.email, name: req.body.name, phone: req.body.phone };




    try {
        let user = await User.findOneAndUpdate(filter, update, {
            // returnOriginal: false
            new: true
        });
        const token = req.token
        res.send({ user, token })
        console.log("userphone" + user.phone);
    } catch (error) {
        //const userToLogin =await User.verifyLogin(req.body.email,req.body.password)
        res.status(403).json({
            error_en: 'Error, please try again later',
            error_ar: 'خطأ ، برجاء المحاولة لاحقا'
        });
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
        const tokens = await user.generateAuthToken()
            
            res.send({ userjson, token :tokens.token, refreshToken: tokens.refreshToken})
    } catch (error) {
        //const userToLogin =await User.verifyLogin(req.body.email,req.body.password)
        res.status(400).json({
            error_en: 'Email or Password Incorrect',
            error_ar: 'البريد الالكتروني او الرقم السري خطأ'
        });
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

router.get('/api/user-addresses', auth, (req, res) => {



    try {
        console.log("address");
        let user = req.user
        const addressesList = user.addresses
        const defaultAddress = user.defaultAddress
        // let addressesList  = ObjIndexToZero(addresses,defaultAddress)
        res.send({ user, addressesList, defaultAddress });

    } catch (error) {
        //const userToLogin =await User.verifyLogin(req.body.email,req.body.password)
        res.status(400).send(error)
    }



})


router.get('/api/lists/list', async (req, res) => {

    try {
        const users = await User.find({})
        res.send({ users });
    } catch (error) {
        res.status(400).send({ error })
    }

})

router.post('/api/user-add-address', auth, async (req, res) => {




    try {

        let user = req.user
        console.log("name:" + user.name);
        user.addresses = user.addresses.concat({
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
        const addresses = user.addresses
        //get last item in array
        const address = user.addresses.slice(-1).pop()
        user.defaultAddress = address
        await user.save()


        const defaultAddress = user.defaultAddress
        let addressesList = ObjIndexToZero(addresses, defaultAddress)
        await user.save()
        res.send({ user, defaultAddress, addressesList });
    } catch (error) {
        res.status(400).send({ error });
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
        AddressFind = user.addresses.find((address) => address._id == req.body.id)
        if (!AddressFind) {
            return res.send("Address is not found")
        }


        console.log("name:" + user.name);
        user.defaultAddress = AddressFind
        await user.save()
        const defaultAddress = user.defaultAddress

        const addresses = user.addresses
        let addressesList = ObjIndexToZero(addresses, AddressFind)
        await user.save()
        res.send({ user, defaultAddress, addressesList });


    } catch (error) {
        res.status(400).send({ error });
    }
})
router.get('/api/admin/deleteuser/:id', (req, res) => {



    User.deleteOne({ _id: req.params.id }).then((user) => {
        res.send('succefully ' + user.count + 'member has been removed');
    }).catch((e) => {
        res.status(400).send(e);

    })
})


//get visitor ip

router.get('/api/getip', (req, res) => {

    var ip = (req.headers['x-forwarded-for'] || '').split(',').pop().trim() ||
        req.connection.remoteAddress ||
        req.socket.remoteAddress ||
        req.connection.socket.remoteAddress


    try {

        res.status(200).send({ geo: geoip.lookup(ip) })

    } catch (error) {
        res.status(400).send({ error });
    }
})
//google
router.post('/api/goauth', async (req, res) => {

    /*var ip = (req.headers['x-forwarded-for'] || '').split(',').pop().trim() || 
         req.connection.remoteAddress || 
         req.socket.remoteAddress || 
         req.connection.socket.remoteAddress*/


    oauth2Client.setCredentials({
        access_token: req.body.access_token,
        // clientID: "746252017489-f5c1v2vlrlhum6vrl2epec0t74qccbvi.apps.googleusercontent.com",
        // clientSecret: 'FGf7UrLXHsGSmwugR52e2_NU',
    });
    var oauth2 = google.oauth2({

        auth: oauth2Client,
        version: 'v2'
    });
   




    try {
        oauth2.userinfo.get(
             async (err, resProfile)=> {
                if (err) {
                    console.log(err);

                } else {
                    console.log(resProfile);
                 //   res.status(200).send({profile: resProfile.data})
                   await InsertSocialUser(req, res, 'google' ,resProfile.data.id, resProfile.data.email,resProfile.data.name) 
                }
            });
       

    } catch (error) {
        res.status(400).send({ error });
    }
})


routerPromise.route('/api/user/oauth/google')
    .post(passport.authenticate('googleToken', { session: false }), UserController.googleOAuth)

routerPromise.route('/api/user/oauth/facebook')
    .post(passport.authenticate('facebookToken', { session: false }), UserController.facebookOAuth)

router.post('/api/auth/google',
    passport.authenticate('google', { scope: ['profile'] }));
router.post('/api/google/callback',
    passport.authenticate('google', { failureRedirect: '/login' }),
    function (req, res) {
        // Successful authentication, redirect home.
        res.redirect('/');
    });
    
    
    
    
    //refresh token
    post("/api/token/refresh", (req, res, next) => {
    const refreshToken = req.header('Authorization').replace('Bearer ','')
    if (!refreshToken ) {
        return res.json({ message: "Refresh token not found, login again" });
    }


        const decoded = jwt.verify(refreshToken, 'refreshToken')
        const user = await User.findOne({ _id: decoded._id, 'refreshTokens.refreshToken': refreshToken })
      if (!user) {
res.status(400).send("invalid token")

   } 

    // If the refresh token is valid, create a new accessToken and return it.
    try {
            
            const tokens = await user.generateAuthToken()
            
            res.send({ user, token :tokens.token, refreshToken: tokens.refreshToken})
        } catch (e) {

            res.status(400).send("error")
            //   res.send('error')
        }
});



module.exports = { router, routerPromise } 
