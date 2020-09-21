require('./db/mongoose');
require("dotenv").config()
const User = require('./models/User')
const Admin = require('./models/Admin')
//import Admin from './models/Admin'
const express = require('express')
const jwt = require('jsonwebtoken')
const app = express();
const port = process.env.PORT || 8080
var cors = require('cors');
var bodyParser = require('body-parser');
// configure body parser for AJAX requests
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// add this line

//const path = require('path')
const path = require('path');

const userRouter = require('./routers/userRouter')
const {router , routerPromise} =require('./routers/userRouter')
const adminRouter = require('./routers/adminRouter')
const CategoryRouter = require('./routers/categoryRouter')
const SectionRouter = require('./routers/sectionRouter')
const ProductRouter = require('./routers/productRouter')
const CollectionRouter = require('./routers/collectionRouter')
const orderRouter = require('./routers/orderRouter')
app.use(cors())

app.use(cors({credentials: true, origin: 'https://juv-khaled.herokuapp.com'}));
app.use(cors({credentials: true, origin: 'http://localhost:3000'}));
//enable for using both ports client and server for developement
/*app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Credentials", true);
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
    res.header(
      "Access-Control-Allow-Headers","XMLHttpRequest" ,"authorization",
      "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept"
    );
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  
      next();
    
  });*/
  //--end of enbling use both ports for developing  
 
/*
Access to XMLHttpRequest at 'http://localhost:8080/signup' from origin 'http://localhost:3000' has been blocked by CORS policy: Request header field authorization is not allowed by Access-Control-Allow-Headers in preflight response.
VM167:1 POST http://localhost:8080/signup net::ERR_FAILED
(anonymous) @ VM167:1
dispatchXhrRequest @ 1.chunk.js:540
xhrAdapter @ 1.chunk.js:383
dispatchRequest @ 1.chunk.js:1006
Promise.then (async)
request @ 1.chunk.js:794
Axios.<computed> @ 1.chunk.js:818
wrap @ 1.chunk.js:1334
(anonymous) @ main.chunk.js:3602
(anonymous) @ 1.chunk.js:56297
(anonymous) @ 1.chunk.js:56805
onSubmit @ main.chunk.js:852
onSubmit @ main.chunk.js:1676
executeSubmit @ 1.chunk.js:53070
handleSubmit @ 1.chunk.js:53162
(anonymous) @ 1.chunk.js:51945
(anonymous) @ 1.chunk.js:52791
callCallback @ 1.chunk.js:14631
invokeGuardedCallbackDev @ 1.chunk.js:14680
invokeGuardedCallback @ 1.chunk.js:14733
invokeGuardedCallbackAndCatchFirstError @ 1.chunk.js:14748
executeDispatch @ 1.chunk.js:14833
executeDispatchesInOrder @ 1.chunk.js:14858
executeDispatchesAndRelease @ 1.chunk.js:17742
executeDispatchesAndReleaseTopLevel @ 1.chunk.js:17751
forEachAccumulated @ 1.chunk.js:17723
runEventsInBatch @ 1.chunk.js:17768
runExtractedPluginEventsInBatch @ 1.chunk.js:17978
handleTopLevel @ 1.chunk.js:18022
batchedEventUpdates$1 @ 1.chunk.js:36168
batchedEventUpdates @ 1.chunk.js:15240
dispatchEventForLegacyPluginEventSystem @ 1.chunk.js:18032
attemptToDispatchEvent @ 1.chunk.js:18752
dispatchEvent @ 1.chunk.js:18673
unstable_runWithPriority @ 1.chunk.js:58229
runWithPriority$1 @ 1.chunk.js:25518
discreteUpdates$1 @ 1.chunk.js:36185
discreteUpdates @ 1.chunk.js:15253
dispatchDiscreteEvent @ 1.chunk.js:18652
Show 8 more frames
signup:1 Access to XMLHttpRequest at 'http://localhost:8080/signup' from origin 'http://localhost:3000' has been blocked by CORS policy: Response to preflight request doesn't pass access control check: The value of the 'Access-Control-Allow-Origin' header in the response must not be the wildcard '*' when the request's credentials mode is 'include'. The credentials mode of requests initiated by the XMLHttpRequest is controlled by the withCredentials attribute.
*/
app.use('../uploads', express.static(path.join(__dirname, '../uploads')));


//to get data jason from postman
app.use(express.json())
//app.use(userRouter)
app.use(router)
app.use(routerPromise)
app.use(adminRouter)
app.use(CategoryRouter)
app.use(SectionRouter)
app.use(ProductRouter)
app.use(CollectionRouter)
app.use(orderRouter)

app.use(express.static(path.join(__dirname, '../client/build')))
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build/index.html'))
})
app.listen(port,()=>{
    console.log('ok')
})