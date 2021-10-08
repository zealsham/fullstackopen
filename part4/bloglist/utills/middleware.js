const jwt = require('jsonwebtoken')
const unknownRouteHandler=(error,req,res,next)=>{
    res.status(404).send('unknwon endpoint')
}

const errorHanlder=(error,req,res,next)=>{
    if(error.name === 'JsonWebTokenError'){
        return res.status(400).json({error:'invalid token'})
    }else if(error.name==='TokenExpiredError'){
        return res.status(400).json({error:'token expired'})
    }else if (error.name==='CastError'){
        return res.status(400).json({error:error.message})
    }else if(error.name==='ValidationError'){
        return res.status(400).json({error:error.message})
    }else{
        return res.status(400).json({error:'unknwon error occured'})
    }
}

const tokenExtractor =(req,res,next)=>{
    const authorization = req.get('authorization')
    if(!authorization || !authorization.toLowerCase().startsWith('bearer') ){
        return res.status(401).json({msg:'not authorized'})
    }

    req.token = authorization.substring(7)

    next()

    
}

const userIdentifier=(req,res,next)=>{
    //gets user id from jwt token
    const id = jwt.verify(req.token,process.env.SECRET)
    req.user = id.id
    console.log(req.user)
    next()
}

module.exports={
    unknownRouteHandler,errorHanlder,tokenExtractor,userIdentifier
}