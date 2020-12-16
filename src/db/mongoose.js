const mongoose = require('mongoose')
const dotenv = require('dotenv');
dotenv.config();
//const MongoURL = process.env.MONGODB_URL || 'mongodb+srv://admin:atobsa90@cluster0.laygj.mongodb.net/offer?retryWrites=true&w=majority'
const MongoURL = process.env.MONGODB_URL 
mongoose.connect(MongoURL, {
    useNewUrlParser: true,
    useCreateIndex: true
    
})


