import React, { useState,useEffect } from 'react'
import Form from './components/Form'
import Phonebook from './components/Phonebook'
import Search from './components/Search'
import phoneService from './services/phonehttp'
import Success from './components/Success'
import './index.css'

const App = () => {
  const [ persons, setPersons ] = useState([]) 
  const [ newName, setNewName ] = useState('enter name to add')

  const [phone , setPhone] = useState("enter phone number")

  const[search,setSearch] =  useState("")

  const [succefulOperation, setSuccesfulOperation] = useState(null)

  useEffect(()=>{
    phoneService.getAll()
    .then(response=>{
      setPersons(response)
    })
  },[])

  const formAction=(event)=>{
    event.preventDefault()
    const obj ={
      name:newName,
      number:phone
    }
    // prevent duplicate names,.
    for(let i=0; i<persons.length; i++){
      /* 
      prevents adding of an existing name and number in the phone book 
      updates the number if the name is already in the phone book but number is different
      */
      if((persons[i].name.toLowerCase()===newName.toLowerCase()) && persons[i].number !== phone ){
        if (window.confirm(`${persons[i].name} already exist in phone book , do you want to update the number`)){
          let userid=persons[i].id
          const updateobj ={
            name:persons[i].name,
            number:phone
          }
          phoneService.update(updateobj,userid)
          .then(response=>{
            setPersons(persons.map(pers=> pers.id !==userid ?pers : response))
            setSuccesfulOperation(`${persons[i].name} phone number has been updated`)
            setTimeout(() => {
              setSuccesfulOperation(null)
            }, 6000);
          })
          return
        }
        
        
      }else if (persons[i].name.toLowerCase()===newName.toLowerCase() && persons[i].number ===phone){
        alert(`${newName} is already added to phone book`)
        console.log(newName)
        return
      }
    }
    phoneService.addPerson(obj)
    .then(response=>{
      setPersons(persons.concat(response))
      setSuccesfulOperation(`${obj.name} has been added to the phonebook` )
      setInterval(() => {
        setSuccesfulOperation(null)
      }, 7000);
    })
    setNewName('')
  }
 
  const handleNewName =(event)=>{
    event.preventDefault()
    //console.log(event.target.value)
    setNewName(event.target.value)
  }
  const handlePhone=(event)=>{
    event.preventDefault()
    setPhone(event.target.value)

  }

  const searchfunc =()=>{
    if (search ===""){
      return []
    }
    const arr = persons.filter(obj=>{
       return obj.name.toLowerCase().includes(search.toLowerCase())
    })

    return arr
  }
  let data=searchfunc()


  const handleSearch=(event)=>{
    console.log(event.target.value)
    setSearch(event.target.value)
  }

  const dataToshow= data.length>=1?data:persons // if search query is entered show only that
  return (
    <div>
      <h2>Phonebook</h2>
      <Success message={succefulOperation}></Success>

       <Search  onChange={handleSearch} searchState={search} />
       <Form onSubmit={formAction} newName={newName} handleNewName={handleNewName} handlePhone={handlePhone} phone={phone}/>
      <h2>Numbers</h2>
        <Phonebook phonelist={dataToshow} stateChanger={setPersons}/>

      
    </div>
  )
}

export default App                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       