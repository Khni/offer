const mongoose = require('mongoose')
const path = require('path')
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

//const MongoURL = process.env.MONGODB_URL || 'mongodb+srv://admin:atobsa90@cluster0.laygj.mongodb.net/offer?retryWrites=true&w=majority'
/*
UnhandledPromiseRejectionWarning: Error: self signed certificate in certificate chain
*/
let MongoURL = process.env.MONGODB_URL
if (process.env.NODE_ENV == 'development') {
  MongoURL = process.env.MONGODB_URL_DEV
}

console.log("dev" + process.env.NODE_ENV);

let options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
};
mongoose.connect(MongoURL, options)


