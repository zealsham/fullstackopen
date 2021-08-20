import React from 'react'

const Part=({title,count}) =>{
    return (
      <li>{title} {count}</li>
    )
  }
  
  const Total =({exerCount})=>{
    let total = exerCount.reduce((a,b)=>{
      
      return a +b.exercises
    },0)
 
    
 
    return(
      <h4>total of {total} exercises</h4>
    )
  }
  const Header=({header})=>{
    return (
      <h1>{header.name}</h1>
    )
  }
 
  const Content=({courseContent})=>{
   // console.log(courseContent,"at content")
    return(
     <ul>
       {courseContent.map(data=>{
         console.log(data)
         return <Part title={data.name} count={data.exercises} key={data.id} />
       })}
     </ul>
    )
  }
 
  const Course=({courses})=>{
   // console.log(courses.parts,"at course")
    return (
      <>
      <Header header={courses} />
      <Content courseContent={courses.parts} />
      <Total exerCount={courses.parts} />
      </>
    )
  }

export default Course