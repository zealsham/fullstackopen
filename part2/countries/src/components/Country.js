import React, {useEffect,useState}from 'react'
import axios from 'axios'



const CountryProfile=({content}) =>{
  const API_KEY =  process.env.REACT_APP_API_KEY
    //console.log("content is ",content.languages)
    const [weather,setweather] =useState()
    useEffect(()=>{
           axios.get("http://api.weatherapi.com/v1/current.json?key="+API_KEY+"&q="+content.capital+"&aqi=no")
           .then(response=>{
             setweather(response.data)
             
           })
    },[API_KEY,content.capital])
    if (weather) {
    return(
      <>
      <h1>{content.name}</h1>
      <p>capital {content.capital}</p>
      <p>population {content.population}</p>
      <h1>Languages</h1>
      <ul>
       {content.languages.map(cont=>{
          return (
            <li key={cont.nativeName}>{cont.name}</li>
          )
        })}
        
      </ul>
      <img src={content.flag} alt="the country flag" width="100px" height="100px"/>
      <h1>Weather in {content.capital}</h1>
      <p>condition is {weather.current.condition.text}</p>
      <img src={"http:"+weather.current.condition.icon} alt="weather icon"/>
      <p>Humidity is {weather.current.humidity}</p>
      </>
    )
      }else {
        return  (
      <>
      <h1>{content.name}</h1>
      <p>capital {content.capital}</p>
      <p>population {content.population}</p>
      <h1>Languages</h1>
      <ul>
       {content.languages.map(cont=>{
          return (
            <li key={cont.nativeName}>{cont.name}</li>
          )
        })}
        
      </ul>
      <img src={content.flag} alt="the country flag" width="100px" height="100px"/>
      <h1>Weather loeading.....</h1>
      </>

        )
      }
  }

export default CountryProfile