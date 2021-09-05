import React from 'react'

const ErrorNot=({message})=>{
    if (message===null){
        return null
    }
    return(
        <div className="error">
                {message}
        </div>
    )
}
export default ErrorNot