const Blog=require('../models/blog')
const User = require('../models/user')

const testBlogs=[
    {
        'title': 'doing things for money',
        'url': 'https://google.com',
        'author': 'someone i guess',
        'likes': 24
    },
    {
        'title': 'money make a man doing things for money',
        'url': 'https://google.com',
        'author': 'grati',
        'likes': 4,
    }
]

const testUsers = [{
    'name':'test1',
    'username':'test1',
    'passwordhash':'anotherandomstring'
},
{
    'name':'test2',
    'username':'test2',
    'passwordhash':'randomstring2'
}
]

const getAllBlog = async ()=>{
    const result = await Blog.find({})
    let  fresult = result.map(r=>r.toJSON())
    return fresult

}

const getUsersDb= async ()=>{
    const result = await User.find({})
    let idFix = result.map(r=>r.toJSON())
    return idFix
}

module.exports={
    testBlogs,getAllBlog,getUsersDb,testUsers
}