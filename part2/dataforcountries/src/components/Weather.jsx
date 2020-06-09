import React from 'react'

const Weather = ({weather}) => {

    return(
      <div>
        <h2>Weather in {weather.location.name}</h2>
        <p>
          <strong>Temperature:</strong> 
          {weather.current.temperature} Celsius
        </p>
        <img src={weather.current.weather_icons[0]} alt="Weahter symbol"/>
        <p>
          <strong>Wind:</strong> 
           {weather.current.wind_speed} km/h 
           direction{weather.current.wind_dir}
        </p>
      </div>
    )
  }


export default Weather;