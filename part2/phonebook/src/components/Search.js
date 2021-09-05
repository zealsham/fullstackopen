import react from 'react'

const Search=({searchState,onChange})=>{
 return (
     <>
      fillter shown with: <input value={searchState} onChange={onChange} />
     </>
 )
}
export default Search