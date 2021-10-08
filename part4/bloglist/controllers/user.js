const bcrypt = require('bcrypt')
const userRouter = require('express').Router()
const User = require('../models/user')

userRouter.get('/',async (req,res)=>{

    const user = await User.find({}).populate('blogs',{title:1,likes:1,url:1,author:1})
    res.json(user)
})

userRouter.post('/',async (req,res)=>{
    const body = req.body
    const saltRound = 10
    const passwordHash = await bcrypt.hash(body.password,saltRound)

    if(body.username.length <=2 || body.password.length <=2){ //username and password should be 3 chars at least
        return res.status(400).json({msg:'username or password must be 3 chars'})

    }
    const obj = new User({
        name:body.name,
        username:body.username,
        passwordhash:passwordHash
    })

    const newUser = await obj.save()

    res.json(newUser)

})

module.exports= userRouter