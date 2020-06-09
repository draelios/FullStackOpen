import React from 'react'

const Country = ({country}) => {
  const imgStyle = {
    width:"300",
    height:"200"
  }

  return(
    <div>
      <h1>{country.name}</h1>
      <p>Capital: {country.capital}</p>
      <p>Population: {country.population}</p>
      <h2>Languages</h2>
      <ul>
        {country.languages.map(lang => <li>{lang.name}</li>)}
      </ul>
      <img style={imgStyle} src={country.flag} alt="Flag of the country"/>
    </div>
  )
}


export default Country;