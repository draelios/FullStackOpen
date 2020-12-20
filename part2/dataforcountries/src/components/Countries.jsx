import React from 'react';
import Country from './Country';

const Countries = ({ countries, setValue }) => {
  if (countries.length === 0) {
    return (
      <div>
        no matches
      </div>
    );
  }

  if (countries.length === 1) {
    return (
      <Country country={countries[0]} />
    );
  }

  if (countries.length < 10) {
    return (
      <div>
        {countries.map((c) => (
          <div key={c.alpha2Code}>
            {c.name}
            (
            <button type="button" onClick={() => setValue(c.name)}>
              show
            </button>
            )
          </div>
        ))}
      </div>
    );
  }

  return (
    <div>
      Too many matches, specify another filter
    </div>
  );
};

export default Countries;
