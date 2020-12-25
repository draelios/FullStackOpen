import React from 'react'

const Filter = ({filter, handleFilterChange}) => {
  return (
    <>
      <h1>Phonebook</h1>
      <form >
        Search contact: 
        <input 
          type="text" 
          style={{margin: "10px"}}
          value= {filter}
          onChange={handleFilterChange}
        >
        </input>
      </form>
    </>
  )
}

export default Filter;