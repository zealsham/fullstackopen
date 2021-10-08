
const blogs = [
    {
        _id: '5a422a851b54a676234d17f7',
        title: 'React patterns',
        author: 'Michael Chan',
        url: 'https://reactpatterns.com/',
        likes: 7,
        __v: 0
    },
    {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 5,
        __v: 0
    },
    {
        _id: '5a422b3a1b54a676234d17f9',
        title: 'Canonical string reduction',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
        likes: 12,
        __v: 0
    },
    {
        _id: '5a422b891b54a676234d17fa',
        title: 'First class tests',
        author: 'Robert C. Martin',
        url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
        likes: 10,
        __v: 0
    },
    {
        _id: '5a422ba71b54a676234d17fb',
        title: 'TDD harms architecture',
        author: 'Robert C. Martin',
        url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
        likes: 0,
        __v: 0
    },
    {
        _id: '5a422bc61b54a676234d17fc',
        title: 'Type wars',
        author: 'Robert C. Martin',
        url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
        likes: 2,
        __v: 0
    }  
]
const dummy = (array)=>{
    return 1
}

const totalLikes=(blogList)=>{
    if (blogList.length===0){
        return 0
    }

    const value= blogList.reduce((sum,item)=>{
        return sum+item.likes
    },0)
    return value
}

const favoriteBlog=(blogList)=>{
    let  obj = blogList.map(obj=>{
        return obj.likes
    })
    //find the blog with highest likes
    const index = obj.indexOf(Math.max(...obj))
    return blogList[index]
}

const mostBlogs=(blogList)=>{
    let obj = blogList.map(blog=>blog.author)
    let result ={}
    for(let i=0; i<obj.length; i++){
        if(result[obj[i]]){
            result[obj[i]]++
        }else{
            result[obj[i]]=1
        }

    
    }
    let b = Object.keys(result).reduce((a, b) => result[a] > result[b] ? a : b)//copied from stackoverflow
    let highestAuthor = {
        'author':b,
        'blogs':result[b]
    }
    return highestAuthor
} 

const mostLikes = (blogList)=>{
    let obj={}
    blogList.forEach(blog=>{
        let author=blog.author
        if (obj[author]){
            obj[author]=obj[author]+blog.likes

        }else{
            obj[author]=blog.likes
        }


    })
    let b=Object.keys(obj).reduce((a,b)=>obj[a] > obj[b] ? a:b)
    let mostLikedAuthor ={
        author:b,
        likes:obj[b]
    }
    return mostLikedAuthor
}

 
module.exports = {
    dummy,totalLikes,favoriteBlog,mostBlogs,mostLikes
}