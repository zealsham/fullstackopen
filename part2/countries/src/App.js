import React, {useState,useEffect} from 'react'
import axios from 'axios'
import Content from './components/Content'
import SearchFilter from './components/Search'

 
 

const App =()=>{

  const [countries,setCountries] = useState([])
  const [search , setSearch] = useState("")
  const [filteredCountry,setFilteredCountry] = useState([])
  useEffect(()=>{
    axios.get("https://restcountries.eu/rest/v2/all")
    .then(response=>{
      //console.log(response.data)
      setCountries(response.data)
    })
  },[])

  //search handler 
  const handleSearch =(event)=>{
    setSearch(event.target.value)

    const data = countries.filter(count=>{
      return count.name.toLowerCase().includes(search.toLowerCase())
    })

    setFilteredCountry(data)
  

    

  }

  return (
    <div>
    <SearchFilter onChange={handleSearch} filterVlaue={search}/>
    <Content countryData={filteredCountry} countryShower={setFilteredCountry}/>
    </div>
  )
  }
 
export default App