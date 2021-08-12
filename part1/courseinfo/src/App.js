import React from 'react'

const App=()=>{
   
  const structure = {
    name: "Half Stack application development",
    parts: [
      {
        title:"Fundamentals of React",
        exercises:10
      },
      {
        title:"Using props to pass data",
        exercises:7
      },
      {
        title:"state of component",
        exercises:14
      }
    ]
  }
  return (
    <div>
      <Header title={structure.name}/>
      <Content parts={structure.parts}/>
      <Total total={structure.parts[0].exercises+structure.parts[1].exercises+structure.parts[2].exercises} />
    </div>
  )
}


const Header =(props)=>{
  return (
    <p>{props.title}</p>
  )
}

const Content =(props)=>{
  return(
    <>
    <Part content={props.parts[0].title} num={props.parts[0].exercises}></Part>
    <Part content={props.parts[1].title} num={props.parts[1].exercises}></Part>
    <Part content= {props.parts[2].title} num={props.parts[2].exercises}></Part>
    </>
  )
}

const Total=(props)=>{
  return (
    <p>total number of exercise is {props.total}</p>
  )
}

const Part = (props)=>{
  return (
    <p>{props.content} and number of exercise is {props.num}</p>
  )
}

export default App