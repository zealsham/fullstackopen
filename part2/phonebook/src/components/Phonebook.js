import react,{useState} from 'react'
import personService from '../services/phonehttp'
import Person from './Person'
import ErrorNot from './Error'


const Phonebook=({phonelist,stateChanger})=>{
const [errorOccured,setErrorOccured] = useState(null)
//statechanger updates the person list 
const handleDelete=(id,name)=>{
  if(window.confirm(`delete ${name}`)){
  personService.deletePerson(id)
  .then(response=>{
    const newphonebook = phonelist.filter(entry=>entry.id !== id)
    stateChanger(newphonebook)
  })
  .catch(error=>{
    setErrorOccured(`${name} has already been deleted `)
    setInterval(() => {
      setErrorOccured(null)
    }, 5000);
  })
  stateChanger(phonelist.filter(note=> note.id !== id))
  }
}
    return(
        <>
        <ErrorNot message={errorOccured} />
        {phonelist.map(person=>{
        return (

          <Person data={person} key={person.id} deleteEntry={()=>handleDelete(person.id,person.name)}/>
        )
      })}
        </>
    )
}

export default Phonebook