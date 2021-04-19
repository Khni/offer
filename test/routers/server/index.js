let express = require('express');
let app = express();
const mongoose = require('mongoose')
const path = require('path')
require('dotenv').config({ path: path.resolve(__dirname, '../../../src/.env') });


const Product = require('../../../src/models/Product')
const User = require('../../../src/models/User')
const TestUser = require('./userModel')
let MongoURL = process.env.MONGODB_URL
console.log("dev"+MongoURL );

let bodyParser = require('body-parser');
let port = 8080;


//db options
let options = {
    useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
  };

//db connection
mongoose.connect(MongoURL, options);
let db = mongoose.connection;


//parse application/json and look for raw text
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: 'application/json'}));

app.get("/", (req, res) => res.json({message: "Welcome to our Bookstore!"}));


app.get('/api/test/test',   (req, res) => {
	
	
	
	
	// //Creates a new book
    var user =new TestUser({name:"khaled", age:9})
    //Save it into the DB.
    user.save((err,user) => {
        if(err) {
            res.send(err);
        }
        else { //If no errors, send it back to the client
            res.json({message: "Book successfully added!", user });
        }
    });
    // res.json({message: "Book successfully added!" });

})


// app.route("/book")
//     .get(book.getBooks)
//     .post(book.postBook);
// app.route("/book/:id")
//     .get(book.getBook)
//     .delete(book.deleteBook)
//     .put(book.updateBook);


app.listen(port);
console.log("Listening on port " + port);

module.exports = app; // for testing