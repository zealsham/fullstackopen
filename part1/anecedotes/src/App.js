import React, { useState } from 'react'

const Button=({onClick,text})=>{
    return (
        <button onClick={onClick}>{text}</button>
    )
}
 
const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blod tests when dianosing patients'
  ]
   
  const [selected, setSelected] = useState(0)
  let arr = new Uint8Array(7) // creates an array with each element as 0
  const [votes,setVote]=useState(arr)
  // find the  bigged vote and gets it index
  let maxVote = votes.indexOf(Math.max(...votes))
  const handleClick =()=>{
      let value = Math.floor(Math.random() * 6)
      setSelected(value)
  }

  const handleVote =()=>{
      let data= [...votes]
      data[selected]+=1
      setVote(data)
  }

  return (
    <div>
      <h1>Ancedotes of the day</h1>
      <p>{anecdotes[selected]}</p>
      <p>has {votes[selected]} votes</p>
      <Button onClick={handleClick} text="next anecedote"/>

      <Button onClick={handleVote} text="vote"/>
      <div>
          <h1>Ancedotes with most vote </h1>
          <p>{anecdotes[maxVote]}</p>
          <p>has {votes[maxVote]} votes</p>
      </div>
    </div>
  )
}

export default App