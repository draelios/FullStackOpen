import React, { useState } from 'react';
import axios from 'axios';
import Search from './components/Search';
import Show from './components/List';

import './App.css';
import List from './components/List';

const App = () => {
  const [countriesList, setCountriesList] = useState([]);
  const apiKey = 'de728d58aa81a141d8a728de55f554f0';

  const onSearchTextChange = (event) => {
    const searchWord = event.target.value;
    axios
      .get(`https://restcountries.eu/rest/v2/name/${searchWord}?fields=name;capital;languages;population;flag`)
      .then((res) => {
        setCountriesList(res.data);
      });
  };

  // TODO: make the API call work
  const searchWeather = (country) => {
    axios
      .get(`http://api.weatherstack.com/current?access_key=${apiKey}query=${country.capital}`)
      .then((res) => {
        cou
        ntry.weather = res.data;
        setCountriesList(country);
      });
  };

  const showCountryDetail = (event) => {
    const selectedCountry = countriesList.filter((country) => country.name === event.target.name);
    searchWeather(selectedCountry[0].capital);
  };

  return (
    <div>
      <Search onChange={onSearchTextChange} />
      <List countries={countriesList} onClick={showCountryDetail} />
    </div>
  );
};

export default App;
