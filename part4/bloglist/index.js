const app = require('./app')
const http = require('http')
//const mongoose = require('mongoose')
const config =require('./utills/config')


http.createServer(app).listen(config.PORT)