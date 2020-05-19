require('./db/mongoose');
const User = require('./models/User')
const Admin = require('./models/Admin')
//import Admin from './models/Admin'
const express = require('express')
const jwt = require('jsonwebtoken')
const app = express();
const port = process.env.PORT || 8080
var cors = require('cors');
var bodyParser = require('body-parser');

const userRouter = require('./routers/userRouter')
const {router , routerPromise} =require('./routers/userRouter')
const adminRouter = require('./routers/adminRouter')

//enable for using both ports client and server for developement
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Credentials", true);
    res.header("Access-Control-Allow-Origin", req.headers.origin);
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
    res.header(
      "Access-Control-Allow-Headers",
      "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept"
    );
    if ("OPTIONS" == req.method) {
      res.send(200);
    } else {
      next();
    }
  });
  //--end of enbling use both ports for developing  
 
//to get data jason from postman
app.use(express.json())
//app.use(userRouter)
app.use(router)
app.use(routerPromise)
app.use(adminRouter)





app.listen(port,()=>{
    console.log('ok')
})