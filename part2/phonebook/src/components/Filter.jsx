import React from 'react'

const Filter = ({filter}) => {
  return (
    <>
      <h1>Phonebook</h1>
      <form >
        Search contact: 
        <input 
          type="text" 
          style={{margin: "10px"}} 
          onChange={filter}
        >
        </input>
      </form>
    </>
  )
}

export default Filter;