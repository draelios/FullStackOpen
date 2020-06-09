import React, { useState, useEffect } from 'react'
import Agenda from './components/Agenda.jsx'
import NewPerson from './components/NewPerson.jsx'
import Filter from './components/Filter.jsx'
import axios from 'axios';

const App = () => {

  const getPersons = () =>{
    axios
    .get('http://localhost:3001/persons')
    .then(response => {
      setPersons(response.data);
      setShowList(response.data);
    })
  }

  const [ persons, setPersons ] = useState([]) ;
  const [ newName, setNewName ] = useState('');
  const [ newNumber, setNewNumber ] = useState('');
  const [ showList, setShowList ] = useState(persons);

  useEffect(getPersons, []);

  const addPerson = (event) => {
    event.preventDefault();

    const newPerson = {
      name: newName,
      number: newNumber
    }

    if(persons.filter(person => person.name === newName).length > 0){
      alert(`${newName} is already added to the phonebook.`);
    } else {
      setPersons(persons.concat(newPerson));  
      setShowList(persons);  
    }

  }

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  }

  const searchContacts = (event) => {
    if(event.target.value.length > 0){
      const fileteredPersons = persons.filter(p => {
      return p.name.toLowerCase().indexOf(event.target.value.toLowerCase()) > -1;
      });
      setShowList(fileteredPersons)
    }

  }

  return (
    <div>
      <Filter filter={searchContacts} />
      <NewPerson 
        newName={newName} 
        newNumber={newNumber} 
        onNameChange={handleNameChange}
        onNumberChange={handleNumberChange}
        addPerson={addPerson}
      />
      <Agenda persons={showList} />
    </div>
  )
}

export default App