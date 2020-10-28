const User = require('../models/User')
const validator = require('validator')



  const InsertSocialUser = async (req, res, social, id, email, name) => {

 console.log("insert social started" +social + id);

    try {
        console.log("insert social started login");
    	let user ='' 
    //login if already exist 
    
         user = await User.findOne({"google.id": id})
        
       
if (user) {
const token = await user.generateAuthToken()
console.log(user+"user");
return res.send({ user, token })

} 



// Check if we have someone with the same email in local
user = await User.findOne({ "local.email": email})
if (user) {
    console.log("insert social same email ?");
// We want to merge google's data with local auth

user.methods.push('Google')
user.google = {
id: id,
email: email
}


await user.save()
const token = await user.generateAuthToken()
return res.send({ user, token })



}//end of if foundUserLocal



//insert brand new users


    console.log("insert social brand new");
    user= new User({
    	name: name,
	methods: ['Google'],
google: {
id: id, 
email: email

}
})

    await user.save()
const token = await user.generateAuthToken()
await user.save()
console.log("after token" + user);
console.log("token" + token);
//const user = userNew
return res.send({  user, token })






console.log("after inserting brand new");
//end of new User




    } catch (error) {
        res.status(400).send({ error })
    }

}

  





 const userSignUp = async (req, res) => {

 

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

    } catch (error) {
        //const userToLogin =await User.verifyLogin(req.body.email,req.body.password)
        res.status(403).json({
            error_en: 'Error, please try again later',
            error_ar: 'خطأ ، برجاء المحاولة لاحقا'
        });
    }

}
 }




module.exports = {InsertSocialUser ,userSignUp}
