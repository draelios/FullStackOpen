import React from 'react';
import Country from './Country';
import Weather from './Weather';

const Detail = ({ country }) => (
  <div>
    <Country country={country} />
    <Weather weather={country.weather} />
  </div>
);

export default Detail;
