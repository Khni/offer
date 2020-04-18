require('./db/mongoose');
const User = require('./models/User')
const express = require('express')
const jwt = require('jsonwebtoken')
const app = express();
const port = process.env.PORT || 3000

const userRouter = require('./routers/userRouter')
//to get data jason from postman
app.use(express.json())
app.use(userRouter)





app.listen(port,()=>{
    console.log('ok')
})