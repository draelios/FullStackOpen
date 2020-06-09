import React, { useState } from 'react';
import Search from './components/Search'
import Show from './components/List';

import axios from 'axios';
import './App.css';


const App = () => {

  const [countriesList, setCountriesList] = useState([])

  const onSearchTextChange = async (event) =>{
    const searchWord = event.target.value;
    axios
    .get(`https://restcountries.eu/rest/v2/name/${searchWord}?fields=name;capital;languages;population;flag`)
    .then(res => {
      setCountriesList(res.data);
     })
    
  }

  const showCountryDetail = (event) => {
    const selectedCountry = countriesList.filter(country => country.name === event.target.name)
    setCountriesList(selectedCountry);
  }


  return(
    <div>
      <Search onChange={onSearchTextChange}/>
      <Show countries={countriesList} onClick={showCountryDetail}/>
    </div>
  )
}

export default App;
