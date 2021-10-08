const config = require('./utills/config')
const express = require('express')
const app = express()
require('express-async-errors') //automatic asynchronous error handling
const logger = require('morgan')
const cors = require('cors')
const blogRouter = require('./controllers/blog')
const mongoose = require('mongoose')
const middleware = require('./utills/middleware')
const loginRouter = require('./controllers/login')
const userRouter = require('./controllers/user')

mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true }).then(
    ()=>{
        console.log('connection succesful')
    }
).catch(err=>console.log(err))

//morgan log pattern definition
logger.token('body',(req) => {
    return JSON.stringify(req.body)
})

app.use(cors())
app.use(express.json())
app.use(logger(':method :url :status :res[content-length] - :response-time ms :body'))

app.use('/api/login',loginRouter)
app.use('/api/users',userRouter)
app.use(middleware.tokenExtractor)
app.use(middleware.userIdentifier)
app.use('/api/blog',blogRouter)

app.use(middleware.errorHanlder)
app.use(middleware.unknownRouteHandler)
module.exports = app