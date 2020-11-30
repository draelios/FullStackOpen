import React from 'react';
import ListElement from './ListElement';
import Detail from './Detail';

const List = ({ countries, onClick }) => {
  if (countries.length > 1 && countries.length <= 10) {
    return (
      <ul>
        {countries.map((country) =>
          <ListElement key={country.name} name={country.name} onClick={onClick} />)}
      </ul>
    );
  } else if (countries.length > 10){
      return <p>Too many countries</p>
  } else if (countries.length===1) {
      return <Detail country={countries[0]}/>
  }else{
      return <></>
  }
  
}

export default List;
