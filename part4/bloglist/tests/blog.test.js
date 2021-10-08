const supertest= require('supertest')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')

const testHelper= require('./test_helper')
const app = require('../app')
 
const api = supertest(app)

const Blog = require('../models/blog')
const User = require('../models/user')

jest.setTimeout(100000)
describe('blog interactions', ()=>{
    beforeEach(async ()=>{
        await  Blog.deleteMany({})


        const blogObject = testHelper.testBlogs.map(blog=>{
            return new Blog(blog)
        })
        const promiseArray = blogObject.map(obj=>{
            return obj.save()
        })
        await Promise.all(promiseArray)
        
    })


    test('return correct amount of post',async()=>{
        const response = await api.get('/api/blog').expect(200).expect('Content-Type',/application\/json/)
        const blogdb= await testHelper.getAllBlog()
        expect(response.body).toHaveLength(blogdb.length)
    })

    test('creation of new blog works',async()=>{
        const blogObj = {
            title:'a funny blog',
            url:'https://zomato.com',
            author:'somegirl',
            likes:20
        }

        const user = await User.findOne({})
        console.log(user)
        blogObj.user = user._id
        const forjw={
            username:user.name,
            id:user._id
        }
        const token = jwt.sign(forjw,process.env.SECRET)
        console.log(token)
        const authHeader = `bearer ${token}`
        const blogs = await testHelper.getAllBlog()
        await api.post('/api/blog').set('Authorization',authHeader).send(blogObj).expect(200).expect('Content-Type',/application\/json/)

        const result = await api.get('/api/blog').set('Authorization',authHeader).expect(200)
    
        expect(result.body).toHaveLength(blogs.length+1)

        const obj = result.body.map(r => r.title)
        expect(obj).toContain('a funny blog')

    



    })
    test('default likes value is  0',async ()=>{
        const blogObj = {
            title:'a funny blog',
            url:'https://zomato.com',
            author:'somegirl'
        
        }
        await  api.post('/api/blog').send(blogObj).expect(200).expect('Content-Type',/application\/json/)
        const result = await testHelper.getAllBlog()

        const arra = result.map(r=>r.likes)
        expect(arra).toContain(0)
    })

    test('unique identifer is id',async ()=>{
        const response = await api.get('/api/blog').expect(200).expect('Content-Type',/application\/json/)

        expect(response.body[0].id).toBeDefined()
    })

    test('lack of title and url returns 400',async ()=>{
        const obj = {
            likes:50,
            author:'the ment'
        }

        await api.post('/api/blog').send(obj).expect(400)
    })

    //*
    describe('delete operations test', ()=>{
        test('deleting a particular blogs works',async ()=>{
        
            const firstresults = await testHelper.getAllBlog()

            const idArray = firstresults.map(r=>r.id.toString())
            //console.log(idArray)

            const value = await api.delete(`/api/blog/${idArray[0]}`).expect(200)

            const secondResult = await testHelper.getAllBlog()

            expect(secondResult).toHaveLength(firstresults.length-1)
        

        

        })
    })

    test('updating a blog works',async ()=>{
        const firstresults = await testHelper.getAllBlog()
        let obj = firstresults[0]
        obj = {
            ...obj,id:obj.id.toString(),likes:10000
        }
        let id = obj.id
        delete obj.id
        console.log(obj)
        console.log(id)
        await api.put(`/api/blog/${id}`).send(obj).expect(200)

        const secondResult = await testHelper.getAllBlog()
        let checker = secondResult.map(r=>r.likes)
        expect(checker).toContain(10000)
        expect(secondResult).toHaveLength(firstresults.length)
    
    })

})

describe('user operations and test',()=>{
    beforeEach(async ()=>{
        await User.deleteMany({})
        const userObject = testHelper.testUsers.map(usr=> new User(usr))
        const promiseArray = userObject.map(usr=>{
            return usr.save()
        })
        await Promise.all(promiseArray)
    })
    test('invalid usernames or password not created',async ()=>{
        const intialDbState = await testHelper.getUsersDb()
        const obj ={
            'name':'kv',
            'username':'kv',
            'passowrd':'bc'
        }

        await api.post('/api/users').send(obj).expect(400).expect('Content-Type',/application\/json/)
        const result = await api.get('/api/users').expect(200).expect('Content-Type',/application\/json/)
        expect(result.body).toHaveLength(intialDbState.length)
        
    })
})
//*/
afterAll(()=>{
    mongoose.connection.close()
})
