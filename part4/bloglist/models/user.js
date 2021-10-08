const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const userSchema = new mongoose.Schema({
    name:String,
    username:{
        type:String,
        unique:true
    },
    passwordhash:String,
    blogs:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:'Blog'
        }
    ]
})
userSchema.plugin(uniqueValidator)
userSchema.set('toJSON',{
    transform: (doc,docbody)=>{
        const  id = docbody._id.toString()
        docbody.id = id
        delete docbody._id
        delete docbody.__v
        delete docbody.passwordhash

    }
})

const User = mongoose.model('BlUser',userSchema)

module.exports=User