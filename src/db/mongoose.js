const mongoose = require('mongoose')
const dotenv = require('dotenv');
dotenv.config();
//const MongoURL = process.env.MONGODB_URL || 'mongodb+srv://admin:atobsa90@cluster0.laygj.mongodb.net/offer?retryWrites=true&w=majority'

let MongoURL = process.env.MONGODB_URL
if (process.env.NODE_ENV== 'development') {
MongoURL = process.env.MONGODB_URL_DEV
} 

let options = {
    useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
  };
mongoose.connect(MongoURL,options)


