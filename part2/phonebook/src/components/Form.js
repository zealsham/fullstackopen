import React from 'react'

const Form=({onSubmit,newName,handleNewName,handlePhone,phone})=>{
  return (
    <form onSubmit={onSubmit}>
    <div>
      <h1>Add a new</h1>
      name: <input value={newName} onChange={handleNewName} /><br/>
      phone: <input value={phone} onChange={handlePhone} />
    </div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>
  )

}

export default Form