require('dotenv').config()
const express = require('express')
const logger = require('morgan')
const cors = require('cors')
const app = express()
const Person = require('./models/ Person')


app.use(cors())
app.use(express.static('build'))
app.use(express.json())
logger.token('body',(req) => {
  return JSON.stringify(req.body)
})
app.use(logger(':method :url :status :res[content-length] - :response-time ms :body'))

app.get('/api/persons',(req,res) => {
  Person.find({}).then(result => {
    res.json(result)
  }).catch(err => {
    res.status(400).json(err)
  })
})

app.get('/info',(req,res,next) => {
  Person.collection.count().then(result => {
    let date = new Date()
    res.send(`<p>phonebook has info for ${result} people</p><p>${date}</p>`)
  }).catch(err => next(err))
})

app.get('/api/persons/:id',(req,res,next) => {
  Person.findById(req.params.id).then(result => {
    if(result){
      res.json(result)
    }else{
      res.status(400).json({ 'error':'does not exist' })
    }
  }).catch(err => {
    next(err)
  })
})

app.delete('/api/persons/:id',(req,res,next) => {
  Person.findByIdAndRemove(req.params.id).then(result => {
    if(result){
      res.json(result)
    }else{
      res.status(400).send('error occured')
    }
  }).catch(error => next(error))

})

app.post('/api/persons',(req,res,next) => {

  const body = req.body

  if(!body.number || !body.name){
    return res.status(400).json({
      'error':'expected params absent'
    })
  }
  const obj = new Person({
    name:body.name,
    number:body.number
  })

  obj.save().then(response => {
    return (response.toJSON())
  }).then(result => res.json(result)).catch(error => {
    next(error)
  })


})

app.put('/api/persons/:id',(req,res,next) => {
  const body = req.body

  const obj ={
    ...body,
    number:body.number
  }
  Person.findByIdAndUpdate(req.params.id,obj,{ new:true }).then(result => {
    if(result){
      res.json(result)
    }else{
      res.status(400).send('failed operation')
    }
  }).catch(error => next(error))
})

const unknownEndpoint=(req,res) => {
  res.status(404).send('not found bro')

}
const errorHanlder=(error,req,res,next) => {
  console.log(error.message)
  if(error.name === 'ValidationError'){
    return res.status(400).json({ 'msg':error.message })
  }else if(error.name==='CastError') {
    return res.status(400).json({ error })
  }
  next(error)
}


app.use(unknownEndpoint)
app.use(errorHanlder)
const PORT = process.env.PORT || 3001
app.listen(PORT,() => {
  console.log('server now running')
})
