const express = require('express')
const User = require('../models/User')
const router = new express.Router()
const auth = require('../middleware/auth')
const authRefreshToken = require('../middleware/authRefreshToken')
const refreshTokenAuth = require('../middleware/refreshTokenAuth')
const passport = require('passport');
const oauth = require('../config/oauth.js');
const GooglePlusTokenStrategy = require('passport-google-plus-token')
const AuthPassport = require("./passport")
const routerPromise = require('express-promise-router')();
const UserController = require('../controllers/userController')
const { InsertSocialUser, userSignUp, InsertFbUser } = require('../controllers/userRouterController.js')
const { HandelErrors } = require('./userUtils')
const { ObjIndexToZero } = require('./usersFuncs')
const { validateLoginInput, validateRegisterInput, validateUpdateInput, updateUser, isUniqueEmail} = require('./utils/routesUtils/usersUtils/users.utils')
const { setLang } = require('./languages/setLang');

const validator = require('validator')
const jwt = require('jsonwebtoken')
var geoip = require('geoip-lite');
const request = require('request');
var google = require('googleapis').google;
const { update } = require('../models/User')
var OAuth2 = google.auth.OAuth2;
var oauth2Client = new OAuth2();

// @desc  Register new user
router.post('/api/:lang/user', async (req, res) => {
    const messages = setLang(req.params.lang)
    const { errors, isValid } = validateRegisterInput(req.body, messages);



    // Check Validation
    if (!isValid) {
        for (const [key, value] of Object.entries(errors)) {
            //console.log(`${key}: ${value}`);
            console.log(value);
        }
        return res.status(400).json(errors);
    }
    //check if email is already exists 
    const email = req.body.email
    const isUnique = await isUniqueEmail("new" ,User, email, messages) 	
    if (!isUnique.isValid) {
    	return res.status(400).json(isUnique.errors);
}
/*
    //check if email is already exists 
    let user = await User.findOne({
        $or: [
            { "google.email": email },
            { "facebook.email": email },
            { "local.email": email }
        ]
    });
    if (user) {
        errors.error = messages.usedEmail
        return res.status(400).json(errors);

    }
    */

    //create new user
    user = new User({
        methods: ['local'],
        name: req.body.name,
        local: {
            email: req.body.email,
            password: req.body.password
        }

    })
    try {
        await user.save()
        const tokens = await user.generateAuthToken()

        res.status(201).send({ user, token: tokens.token, refreshToken: tokens.refreshToken })

    } catch (error) {

        errors.error = messages.error
        res.status(400).json(errors);
    }
})


//routerPromise.route('/api/user/login').post(UserController.login)


// @desc   user login
router.post('/api/:lang/user/login', async (req, res) => {
    const messages = setLang(req.params.lang)
    const { errors, isValid } = validateLoginInput(req.body, messages);

    // Check Validation
    if (!isValid) {
        return res.status(400).json(errors);
    }

    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const tokens = await user.generateAuthToken()

        res.status(200).send({ user, token: tokens.token, refreshToken: tokens.refreshToken })
    } catch (error) {
        const messages = setLang(req.params.lang)
        let errors = {}
        errors.error = messages.incorrectEmailOrPass
        res.status(400).json(errors);
    }


})

/**
 * @description: update route
 * @param: update: name or email or password or phone
 */
router.patch('/api/:lang/user/:update', auth, async (req, res) => {
    const messages = setLang(req.params.lang)
    const update = req.params.update
    let resValidate = validateUpdateInput(req.params.update, req.body, messages);

    // Check Validation
    if (!resValidate.isValid) {
        return res.status(400).json(resValidate.errors);
    }

    try {

        let { errors, isValid, user } = await updateUser(User, update, req.user._id, req.body, messages)
        if (!isValid) {
            return res.status(400).json(errors);
        }

        const tokens = await user.generateAuthToken()
        res.send({ user, token: tokens.token, refreshToken: tokens.refreshToken })

    } catch (error) {
        resValidate.errors.error = messages.error
        res.status(400).json(resValidate.errors);
    }


})

// // @desc update user phone
// router.patch('/api/:lang/user/phone', auth, async (req, res) => {
//     const messages = setLang(req.params.lang)
//     const { errors, isValid } = validateUpdateInput('phone', req.body, messages);

//     // Check Validation
//     if (!isValid) {
//         return res.status(400).json(errors);
//     }

//     try {
//         let user = await User.findOneAndUpdate({ _id: req.user._id }, { phone: req.body.phone }, {
//             // returnOriginal: false
//             new: true
//         });

//         const tokens = await user.generateAuthToken()
//         res.send({ user, token: tokens.token, refreshToken: tokens.refreshToken })

//     } catch (error) {
//         errors.error = messages.error
//         res.status(400).json(errors);
//     }


// })


/*
// @desc edit user password 
router.patch('/api/:lang/user/password', auth, async (req, res) => {
    const messages = setLang(req.params.lang)
    const { errors, isValid } = validateUpdateInput('password', req.body, req.params.lang);

    // Check Validation
    if (!isValid) {
        return res.status(400).json(errors);
    }
//
    if (!req.user.local.email) {
    	//set error
        return res.status(400).json(errors);
    }

    try {
        const user = await User.findByCredentials(req.user.local.email, req.body.password)
    } catch (error) {
        errors.error = messages.incorrectPassword
        return res.status(400).json(errors);
    }

    try {
        let user = await User.findOneAndUpdate({ _id: req.user._id }, { password: req.body.password }, {
            // returnOriginal: false
            new: true
        });

        const tokens = await user.generateAuthToken()
        res.send({ user, token: tokens.token, refreshToken: tokens.refreshToken })

    } catch (error) {
        errors.error = messages.error
        res.status(400).json(errors);
    }


})



// @desc  update user email

router.patch('/api/:lang/user/email', auth, async (req, res) => {
    const messages = setLang(req.params.lang)
    const { errors, isValid } = validateUpdateInput('email', req.body, messages);

    // Check Validation
    if (!isValid) {
        return res.status(400).json(errors);
    }

    //check if user is already exists 
    let user = await User.findOne({
        $or: [
            { "google.email": email },
            { "facebook.email": email },
            { "local.email": email }
        ]
    });
    if (user && req.user.local.email !== req.body.email) {
        errors.error = messages.usedEmail
        return res.status(400).json(errors);

    }
    //unable to update local email if it already registered as Google or Facebook 
    if (req.user.local.email !== req.body.email && !req.user.google.email && !req.user.facebook.email) {
        errors.error = messages.error
        res.status(403).json(errors);
    }

    try {
        let user = await User.findOneAndUpdate({ _id: req.user._id }, { "local.email": req.body.email }, {
            // returnOriginal: false
            new: true
        });

        const tokens = await user.generateAuthToken()
        res.send({ user, token: tokens.token, refreshToken: tokens.refreshToken })

    } catch (error) {
        errors.error = messages.error
        res.status(400).json(errors);
    }


})

*/


//fb auth
router.post('/api/:lang/user/fb', async (req, res) => {
	const messages = setLang(req.params.lang)
	let errors  = {} 
 request('https://graph.facebook.com/' + req.body.id + '?access_token=' + req.body.accessToken, { json: true }, async (error, response, body) => {
        
    if (!body.name || !body.id) {
    	errors.error = body.error
        return  res.status(400).json(errors);
   } 
   
   
        const email = req.body.email
                const name = body.name
                const id = body.id    
            try {
        
        let user = {} 
        //login if already exist 
        user = await User.findOne({ "facebook.id": id })
           if (user) {
              const tokens = await user.generateAuthToken()
              return  res.send({ user, token :tokens.token, refreshToken: tokens.refreshToken})
            }


        // Check if we have someone with the same email in local to merge Google id with local
        user = await User.findOne({ "local.email": email })
        if (user) {
            user.methods.push('Facebook')
            user.facebook = {
                id: id,
                email: email
            }
           await user.save()
            const tokens = await user.generateAuthToken()
            return   res.send({ user, token :tokens.token, refreshToken: tokens.refreshToken})
        }

        //insert brand new users
        user = new User({
            name: name,
            methods: ['Facebook'],
            facebook: {
                id: id,
                email: email
            }
        })

        await user.save()
        const tokens = await user.generateAuthToken()
        return   res.send({ user, token :tokens.token, refreshToken: tokens.refreshToken})

    } catch (error) {
        errors.error = messages.error
        res.status(400).json(errors);
    }
            
    });

})



//google auth
router.post('/api/:lang/user/google', async (req, res) => {
	const messages = setLang(req.params.lang)
	let errors  = {} 
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
            async (err, resProfile) => {
                if (err) {
         errors.error = messages.error
        return res.status(400).json(errors);

                } 
                
                const email = resProfile.data.email
                const name = resProfile.data.name
                const id = resProfile.data.id
                
               let user = {} 
        //login if already exist 
        user = await User.findOne({ "google.id": id })
           if (user) {
              const tokens = await user.generateAuthToken()
              return  res.send({ user, token :tokens.token, refreshToken: tokens.refreshToken})
            }


        // Check if we have someone with the same email in local to merge Google id with local
        user = await User.findOne({ "local.email": email })
        if (user) {
            user.methods.push('Google')
            user.google = {
                id: id,
                email: email
            }
           await user.save()
            const tokens = await user.generateAuthToken()
            return   res.send({ user, token :tokens.token, refreshToken: tokens.refreshToken})
        }

        //insert brand new users
        user = new User({
            name: name,
            methods: ['Google'],
            Google: {
                id: id,
                email: email
            }
        })

        await user.save()
        const tokens = await user.generateAuthToken()
        return   res.send({ user, token :tokens.token, refreshToken: tokens.refreshToken})
                    
                
            });


    } catch (error) {
        errors.error = messages.error
        return res.status(400).json(errors);
    }
  

})












//post/create new user 
//
router.post('/api/user-signup', async (req, res) => await userSignUp(req, res))





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
        return res.status(400).json({
            error_en: 'Email is invalid',
            error_ar: 'الايميل غير صحيح'
        });
    }


    let user = await User.findOne({ "local.email": email })
    if (user && req.user.local.email !== email) {
        return res.status(400).json({
            error_en: 'Email is already in use',
            error_ar: 'البريد الالكترونى مسجل مسبقا '
        });

    }
    let userphone = await User.findOne({ phone: req.body.phone })
    console.log("ss" + userphone);
    console.log("req" + req.body.phone);
    if (userphone && req.user.phone !== req.body.phone) {
        return res.status(400).json({
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
        const tokens = await user.generateAuthToken()


        res.send({ user, token: tokens.token, refreshToken: tokens.refreshToken })
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







    try {
        const user = await User.findByCredentials(EmailInput, PasswordInput)
        const tokens = await user.generateAuthToken()

        res.status(200).send({ user, token: tokens.token, refreshToken: tokens.refreshToken })
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
            apartment: req.body.apartment,
            fullAddress: req.body.fullAddress

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


//fb 
router.post('/api/fbauth', async (req, res) => {
    request('https://graph.facebook.com/' + req.body.id + '?access_token=' + req.body.accessToken, { json: true }, async (error, response, body) => {
        console.error('error:', error); // Print the error if one occurred
        console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
        console.log('body:', body); // Print the HTML for the Google homepage.


        if (body.name && body.id) {
            await InsertFbUser(req, res, "facebook", body.id, req.body.email, body.name)
            console.log("name" + body);
            console.log("email" + req.body.email);
            res.send("Welcome" + body.id).status(201)
        } else {
            res.send({ error: body.error }).status(400)
        }

    });

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
            async (err, resProfile) => {
                if (err) {
                    console.log(err);

                } else {
                    console.log(resProfile);
                    //   res.status(200).send({profile: resProfile.data})
                    await InsertSocialUser(req, res, 'google', resProfile.data.id, resProfile.data.email, resProfile.data.name)
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
// router.get("/api/token/refresh", async (req, res, next) => {

//     const refreshToken = req.header('Authorization').replace('Bearer ', '')
//     if (!refreshToken) {
//         return res.json({ message: "Refresh token not found, login again" });
//     }

//     const logOut = async (user) => {
//         // log the user out coz someone used the real refresh token ,,
//         //token may be leaked
//        user.refreshToken = ''
//        user.tokens = []
//        await user.save()

//     }
//     try {
//         const decoded = jwt.verify(refreshToken, 'refreshToken')
//     } catch (error) {
//         res.status(400).send({ error: error})
//     }


//     const user = await User.findOne({ _id: decoded._id})
//     console.log("user"+user);
//      if (!user) {
//         res.status(400).send({ error: "invalid token" })

//     }


//     if (user.refreshToken != refreshToken ) {
//          await logOut(user)
//        return res.status(400).send({ error: "log user out"})
//     }
//    // const user = await User.findOne({ _id: decoded._id, refreshToken: refreshToken })


//     // If the refresh token is valid, create a new accessToken and return it.

//     try {
//         const tokens = await user.generateAuthToken()


//         res.send({ user, token: tokens.token, refreshToken: tokens.refreshToken })
//     } catch (e) {
//    //console.log(e);

//    //if it expired or token in invalid 
//         res.status(400).send({ error: error.name})
//         //   res.send('error')
//     }
// });



// router.post('/api/user/refreshToken', authRefreshToken, async (req, res) => {


//         res.status(200).send()


// })


router.post('/api/user/refresh-Token', refreshTokenAuth)



module.exports = { router, routerPromise }
