const passport = require('passport');
const oauth = require('../config/oauth.js');
const GooglePlusTokenStrategy = require('passport-google-plus-token')
const User = require('../models/User')

passport.use('googleToken', new GooglePlusTokenStrategy({
   /* clientID: oauth.google.clientID,
    clientSecret: oauth.google.clientSecret,*/
    clientID: '746252017489-f5c1v2vlrlhum6vrl2epec0t74qccbvi.apps.googleusercontent.com',
        clientSecret: 'FGf7UrLXHsGSmwugR52e2_NU',
    passReqToCallback: true,
    }, async (req, accessToken, refreshToken, profile, done) => {
         const founduser = await User.findOne({"google.id": profile.id})
         if (founduser) {
      return done(null, founduser) 
      } 
      
      
      
      // Check if we have someone with the same email in local
      foundUserLocal = await User.findOne({ "local.email": profile.emails[0].value })
      if (foundUserLocal) {
        // We want to merge google's data with local auth
        foundUserLocal.methods.push('Google')
        foundUserLocal.google = {
          id: profile.id,
          email: profile.emails[0].value
        }
        
        try {
        await foundUserLocal.save()
        return done(null, foundUserLocal);
    //    res.status(201).send({user, token})
    } catch (e) {
      //  res.status(400).send(e)
    }
        
        
        
        
      }
      
      
      
      //insert brand new users
      const user = new User({
    	methods: ['Google'],
      google: {
        Id: profile.id, 
        email: profile.emails[0].value, 

      }
          })
    try {
        await user.save()
        const token = await user.generateAuthToken()
       //res.status(201).send({user, token})
    } catch (e) {
    //    res.status(400).send(e)
    }
   } 

      
  console.log(profile.emails[0].value);
  
   
  }
  ))