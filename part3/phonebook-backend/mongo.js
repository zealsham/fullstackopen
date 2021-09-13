const mongoose = require('mongoose')

if(process.argv.length<3){
  console.log('atleast enter a password or data to add')
  process.exit(1)
}
let password = process.argv[2]
const url = `mongodb+srv://phonebook:${password}@cluster0.a3aja.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`
mongoose.connect(url)
const personSchema = new mongoose.Schema({
  name: String,
  number: Number
})

const Person = mongoose.model('Phonebook',personSchema)



if (process.argv.length===3){
  Person.find({}).then(result => {
    result.forEach(data => {
      console.log(data)
    })
    mongoose.connection.close()
    process.exit(1)
  })
}


if (process.argv.length===5){
  const personData= new Person({
    name:process.argv[3],
    number:process.argv[4]
  })
  personData.save().then(() => {
    console.log(`added ${process.argv[3]} number ${process.argv[4]} to phonebook`)
    mongoose.connection.close()
  })
}

