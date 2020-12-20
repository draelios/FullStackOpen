import React, {useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Countries from './components/Countries';
import Search from './components/Search';
import './App.css';

const App = () => {
  const [countries, setCountries] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    axios.get('https://restcountries.eu/rest/v2/all').then((result) => {
      setCountries(result.data);
    });
  }, []);

  const filteredCountries = filter.length === 1 ?
    countries
    : countries.filter((c) => c.name.toLowerCase().indexOf(filter.toLowerCase()) > -1);

  return (
    <div>
      <Search
        value={filter}
        setValue={setFilter}
      />
      <Countries
        countries={filteredCountries}
        setValue={setFilter}
      />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'))

export default App;
