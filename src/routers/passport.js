
const passport = require('passport');
const oauth = require('../config/oauth.js');
const GooglePlusTokenStrategy = require('passport-google-plus-token')
const FacebookTokenStrategy = require('passport-facebook-token');
 
const User = require('../models/User')

passport.use('googleToken', new GooglePlusTokenStrategy({
/* clientID: oauth.google.clientID,
clientSecret: oauth.google.clientSecret,*/
clientID: '746252017489-f5c1v2vlrlhum6vrl2epec0t74qccbvi.apps.googleusercontent.com',
clientSecret: 'FGf7UrLXHsGSmwugR52e2_NU',
passReqToCallback: true,
}, async (req, accessToken, refreshToken, profile, done) => {
	

try {
//if Google account is already exist just send it
let user = await User.findOne({"google.id": profile.id})
if (user) {
const token = await user.generateAuthToken()
return done(null, founduser) 
} 



// Check if we have someone with the same email in local
user = await User.findOne({ "local.email": profile.emails[0].value })
if (user) {
// We want to merge google's data with local auth
user.methods.push('Google')
user.google = {
id: profile.id,
email: profile.emails[0].value
}


await user.save()
const token = await user.generateAuthToken()
return done(null, user);



}//end of if foundUserLocal



//insert brand new users
const user = new User({
	methods: ['Google'],
google: {
id: profile.id, 
email: profile.emails[0].value, 

}
})//end of new User

await user.save()
const token = await user.generateAuthToken()
done(null, user)

} //end of try

catch(error) {
    done(error, false, error.message);
    }
//console.log(profile.emails[0].value);


}//end of async function 


))









passport.use('facebookToken', new FacebookTokenStrategy({
clientID: oauth.facebook.clientID,
clientSecret: oauth.facebook.clientSecret,
/*clientID: '746252017489-f5c1v2vlrlhum6vrl2epec0t74qccbvi.apps.googleusercontent.com',
clientSecret: 'FGf7UrLXHsGSmwugR52e2_NU',*/
passReqToCallback: true,
}, async (req, accessToken, refreshToken, profile, done) => {
	

try {
//if fb account is already exist just send it
let user = await User.findOne({"facebook.id": profile.id})
if (user) {
	const token = await user.generateAuthToken()
return done(null, user) 
} 



// Check if we have someone with the same email in local
user = await User.findOne({ "local.email": profile.emails[0].value })
if (user) {
// We want to merge google's data with local auth
user.methods.push('Facebook')
user.facebook = {
id: profile.id,
email: profile.emails[0].value
}


await user.save()
const token = await user.generateAuthToken()
return done(null, user);



}//end of if foundUserLocal



//insert brand new users
 user = new User({
	methods: ['Facebook'],
facebook: {
id: profile.id, 
email: profile.emails[0].value, 

}
})//end of new User

await user.save()
const token = await user.generateAuthToken()
done(null, user)

} //end of try

catch(error) {
    done(error, false, error.message);
    }
//console.log(profile.emails[0].value);


}//end of async function 


))


//MongoError: E11000 duplicate key error collection: offer.users index: local.email_1 dup key: { local.email: null }
//ya29.a0AfH6SMAcAp_-q97URXXhkSAEj_trJTRQfKePL93-CT9_X88U5Kirrp0ugDiMeiOA2znl3KqnYIsWSQL1RIlIwgGloHzPtc1uGpmz6r82OQc4qXZed3hVIj8fd5OKBZvhLU5FwnqDplfw2WTj9-PWzMD9zsWKuOeKjlbo
// passport.initialize() middleware not in use<br> &nbsp; &nbsp;at IncomingMessage.req.login.req.logIn 
