import React from 'react'

const SearchFilter =({filterVlaue,onChange}) =>{
    return (
        <>
        find countries: <input value={filterVlaue} onChange={onChange} />
        
        </>
    )
}

export default SearchFilter