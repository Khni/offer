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

const adminRouter = require('./routers/adminRouter')

//enables cors for using both ports client and server for developement
app.use(cors({
    'allowedHeaders': ['sessionId', 'Content-Type'],
    'exposedHeaders': ['sessionId'],
    'origin': '*',
    'methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
    'preflightContinue': false
  }));
//to get data jason from postman
app.use(express.json())
app.use(userRouter)
app.use(adminRouter)





app.listen(port,()=>{
    console.log('ok')
})