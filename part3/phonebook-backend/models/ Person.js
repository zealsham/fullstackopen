const mongoose = require('mongoose')
const validator = require('mongoose-unique-validator')
mongoose.set('runValidators',true)

const url = process.env.MONGODB_URI

mongoose.connect(url).then(() => {
  console.log('connection success')
}).catch(() => {
  console.log('connection failed')
})

const personSchema= new mongoose.Schema({
  name:{
    type:String,
    required:true,
    unique:true,
    minlength:3,
    maxlength:40
  },
  number:{
    type:String,
    minlength:8,
    maxlength:14
  }
})
personSchema.plugin(validator)
personSchema.set('toJSON',{
  transform:(doc,rec) => {
    rec.id = rec._id.toString()
    delete rec._id
    delete rec.__v
  }
})

module.exports = mongoose.model('Phonebook',personSchema)