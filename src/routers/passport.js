
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
	

try {

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


await foundUserLocal.save()
return done(null, foundUserLocal);






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


//MongoError: E11000 duplicate key error collection: offer.users index: local.email_1 dup key: { local.email: null }
//ya29.a0AfH6SMAcAp_-q97URXXhkSAEj_trJTRQfKePL93-CT9_X88U5Kirrp0ugDiMeiOA2znl3KqnYIsWSQL1RIlIwgGloHzPtc1uGpmz6r82OQc4qXZed3hVIj8fd5OKBZvhLU5FwnqDplfw2WTj9-PWzMD9zsWKuOeKjlbo
// passport.initialize() middleware not in use<br> &nbsp; &nbsp;at IncomingMessage.req.login.req.logIn 
