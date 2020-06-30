import React, { useState } from 'react';
import axios from 'axios';
import Search from './components/Search';
import Show from './components/List';

import './App.css';

const App = () => {
  const [countriesList, setCountriesList] = useState([]);
  const apiKey = process.env.REACT_APP_API_KEY;

  const onSearchTextChange = (event) => {
    const searchWord = event.target.value;
    axios
      .get(`https://restcountries.eu/rest/v2/name/${searchWord}?fields=name;capital;languages;population;flag`)
      .then((res) => {
      // TODO: add weather to selected countries
        setCountriesList(res.data);
      });
  };

  // TODO: make the API call work
  const searchWeather = (city) => {
    axios
      .get(`http://api.weatherstack.com/current?access_key=${apiKey}}query=Madrid}`)
      .then((res) => {
        debugger;
        return res.data;
      });
  };

  const showCountryDetail = (event) => {
    const selectedCountry = countriesList.filter((country) => country.name === event.target.name);
    const weather = searchWeather(selectedCountry[0].capital);
    setCountriesList(selectedCountry);
  };

  return (
    <div>
      <Search onChange={onSearchTextChange} />
      <Show countries={countriesList} onClick={showCountryDetail} />
    </div>
  );
};

export default App;
