import React from 'react'

const Search = ({onChange}) => {
  return(
    <form>
      <p>Search for countries:</p>
      <input 
        type="text" 
        onChange={onChange}
        placeholder="Search for a country"
      >
      </input>
    </form>
  )
}

export default Search;