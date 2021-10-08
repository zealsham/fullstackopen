const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const loginRouter = require('express').Router()
const User = require('../models/user')

loginRouter.post('/',async (req,res)=>{
    const body = req.body

    const user = await  User.findOne({username:body.username})
    // check if user exist 
    const userPassword = user===null ? false : await bcrypt.compare(body.password,user.passwordhash)
    if(user === null || userPassword===false){
        return  res.status(401).json({msg:'username or password is not correct'})
    }

    const forjwt = {
        user:user.username,
        id:user._id
    }
    const token =jwt.sign(forjwt,process.env.SECRET)
    

    res.status(200).json({token,username:user.username,name:user.name})

})

module.exports=loginRouter