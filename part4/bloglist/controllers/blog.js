const jwt = require('jsonwebtoken')
const blogRouter = require('express').Router()
//const { restart } = require('nodemon')
const Blog = require('../models/blog')
const User = require('../models/user')
 


blogRouter.get('/',async (req,res)=>{
    //await Blog.deleteMany({})

    const result = await Blog.find({}).populate('user',{username:1})
    res.json(result)

})

blogRouter.post('/',async (req,res,next)=>{
    if(!req.body.title || !req.body.url){
        return res.status(400).json({'error':'an error occured '})
    }
    if(!req.body.likes){
        req.body.likes=0
    }
    const  verifiedToken = jwt.verify(req.token,process.env.SECRET)
    if(!req.token || !verifiedToken.id){
        return res.status(401).json({msg:'not authorized'})
    }

    const body = req.body
    const user = await  User.findById(body.user)

   
    
    const blog = new Blog({
        title:body.title,
        author:body.author,
        likes:body.likes,
        url:body.url,
        user: user.id
    })
    const result = await blog.save()
    user.blogs = user.blogs.concat(result._id)
    await user.save()
    res.json(result)

})

blogRouter.delete('/:id',async (req,res,next)=>{

    const blog = await Blog.findById(req.params.id)
    if(!blog){
        return res.status(400).json({msg:'blog not found'})
    }
    
    if(!req.token || blog.user.toString() !== req.user){
        return res.status(400).json({msg:'not authorized to delete'})

    }

    const results = await Blog.findByIdAndRemove(req.params.id)
    if(results){
        const user = await User.findById(results.user)
        //delete removed blog id from list of userblogs
        user.blogs = user.blogs.filter(blog=> blog.toString() != req.params.id)
        await user.save()
        return res.status(200).json(results)
    }else{
        res.status(400).json({'err':'an error occured'})
    }

})

blogRouter.put('/:id', async (req,res,next)=>{
    const obj={
        title:req.body.title,
        author:req.body.author,
        likes:req.body.likes,
        url:req.body.url
    }

    try {
        let result = await Blog.findByIdAndUpdate(req.params.id,obj,{new:true})
        res.json(result)
    }catch(err){
        next(err)
    }
})

module.exports = blogRouter
