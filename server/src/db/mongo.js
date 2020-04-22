const mongodb = require('mongodb');

const MongoClient = mongodb.MongoClient;
const ObjectId = mongodb.ObjectID;

const connectionURL = 'mongodb://127.0.0.1:27017';

const databaseName = 'offer';

MongoClient.connect(connectionURL , {useNewUrlParser: true}, (err , client) => {
    if (err){
        return console.log('unable to connect to database' + err)
    }
   const db = client.db(databaseName);

})