const mongoose = require('mongoose')
const MongoURL = process.env.MONGODB_URL || 'mongodb+srv://admin:atobsa90@cluster0.laygj.mongodb.net/offer?retryWrites=true&w=majority'
mongoose.connect(MongoURL, {
    useNewUrlParser: true,
    useCreateIndex: true
    
})


