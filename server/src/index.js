require('./db/mongoose');
const User = require('./models/User')
const Admin = require('./models/Admin')
//import Admin from './models/Admin'
const express = require('express')
const jwt = require('jsonwebtoken')
const app = express();
const port = process.env.PORT || 3000

const userRouter = require('./routers/userRouter')

const adminRouter = require('./routers/adminRouter')
//to get data jason from postman
app.use(express.json())
app.use(userRouter)
app.use(adminRouter)





app.listen(port,()=>{
    console.log('ok')
})