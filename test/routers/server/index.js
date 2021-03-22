let express = require('express');
let app = express();
const mongoose = require('mongoose')
const dotenv = require('dotenv');
dotenv.config();
const Product = require('../../../src/models/Product')

let MongoURL = process.env.MONGODB_URL


let bodyParser = require('body-parser');
let port = 8080;


//db options
let options = {
                server: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } },
                replset: { socketOptions: { keepAlive: 1, connectTimeoutMS : 30000 } }
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


app.get('/api/test/test', async  (req, res) => {
	
	
	let products = await Product.find({})
	
	
    

    try {
   res.status(200).send({products})
	
    

        
    } catch (e) {
        res.status(400).send(e)
    }
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