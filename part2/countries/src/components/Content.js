import React from 'react'
import CountryProfile from './Country'

 

const Content =({countryData,countryShower })=>{
 if (countryData.length===0){
     return(
         <div>
           <p>too many matches </p>
        
         </div>
     )
 }
   
 
 if (countryData.length>1 && countryData.length <=10){
 return (
     <div>
         <ul>
         {countryData.map(count=>{
             
             return <li key={count.name}>{count.name} <button onClick={()=>countryShower([count])}>show view</button></li> 
         })}
         </ul>
     </div>
 )
        
}
if(countryData.length===1) {
    return(
        <div>
            <CountryProfile content={countryData[0]}/>
        </div>
    )
}
else {
    return(
        <div>
            <p>too many matches</p>
        </div>
    )
}
}

export default Content