





const passport = require('passport');
const oauth = require('../config/oauth.js');
const GooglePlusTokenStrategy = require('passport-google-plus-token')

passport.use('googleToken', new GooglePlusTokenStrategy({
   /* clientID: oauth.google.clientID,
    clientSecret: oauth.google.clientSecret,*/
    clientID: '746252017489-f5c1v2vlrlhum6vrl2epec0t74qccbvi.apps.googleusercontent.com',
        clientSecret: 'FGf7UrLXHsGSmwugR52e2_NU',
    passReqToCallback: true,
    }, async (req, accessToken, refreshToken, profile, done) => {
       
  console.log(profile.emails[0].value);
  
   
  }
  ))