const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema({
    title:String,
    url:String,
    author:String,
    likes:Number,
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'BlUser'
    }
})

blogSchema.set('toJSON',{
    transform:(doc,res)=>{
        const id= res._id
        res.id = id
        delete res._id
        delete res.__v
    }
})

module.exports=mongoose.model('Blog',blogSchema)