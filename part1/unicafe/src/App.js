import React,{useState} from 'react'
// commenting on the code
const Button =({onClick,text})=>{
  return (
    <button onClick={onClick}>{text}</button>
  )
}
const StatisticLine=({text,value})=>{
  return (
    <td>{text}:{value}</td>
  )
}
const Statistics=({allgood,allbad,allneutral})=>{
  let all = [...allgood,...allbad,...allneutral]
   
  if (all.length===0){
    return(
      <p>No feed back given</p>
    )
  }

  const average=()=>{
    let final= (allgood.length-allbad.length)/(allgood.length+allneutral.length+allbad.length)
    return final
  }

  const percentageGood=()=>{
    let percentage = (allgood.length/(allgood.length+allbad.length+allneutral.length))*100
    return percentage+"%"
  }
  return (
    <>
    <table>
      <tbody>
      <tr>
      <StatisticLine text="good" value={allgood.length}/>
      
      </tr>
      <tr>
      <StatisticLine text="neutral" value={allneutral.length}/>
      </tr>
      <tr>
      <StatisticLine text="bad" value={allbad.length} />

      </tr>
      <tr>
      <StatisticLine text="average" value={average()}/>
      </tr>
      <tr>
      <StatisticLine text="percentage" value={percentageGood()}/>
      </tr>
      </tbody>
     
   </table>
 
  </>

  )
}
const App =()=>{
  const [good,setGood] = useState([])
  const [bad,setBad] = useState([])
  const [neutral, setNeutral]= useState([])

  const handleGood =()=>{
    setGood(good.concat(1))
  }

  const handleBad = ()=>{
    setBad(bad.concat(-1))
  }

  const handNeutral = ()=>{
    setNeutral(neutral.concat(0))
  }

  
  return (
    <div>
      <h1>give feedback </h1>
      <Button onClick={handleGood} text="good"/>
      <Button onClick={handNeutral} text="neutral"/>
      <Button onClick={handleBad} text="bad"/>
      <h1>statistics</h1>
      <Statistics allgood={good} allbad={bad} allneutral={neutral}/>
    </div>
  )
}

export default App