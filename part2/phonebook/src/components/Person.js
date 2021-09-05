import React from 'react'

const Person=({data,deleteEntry})=>{
    return (
        
        <p>{data.name}  {data.number}<button onClick={deleteEntry}>delete</button></p>
    )
}

export default Person