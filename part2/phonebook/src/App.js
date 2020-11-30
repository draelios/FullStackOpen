import React, { useState, useEffect } from 'react'
import Agenda from './components/Agenda.jsx'
import NewPerson from './components/NewPerson.jsx'
import Filter from './components/Filter.jsx'
import services from './Services/services.js';

const App = () => {


  const getPersons = () =>{
    services.getAll().then(response => setPersons(response.data))
  }

  const [ persons, setPersons ] = useState([]) ;
  const [ newName, setNewName ] = useState('');
  const [ newNumber, setNewNumber ] = useState('');

  useEffect(getPersons, []); 

  const testhacealgo = () => {
    return 1;
  }

  const addPerson = (event) => {
    event.preventDefault();

    const newPerson = {
      name: newName,
      number: newNumber
    }

    if(persons.filter(person => person.name === newName).length > 0){
      alert(`${newName} is already added to the phonebook.`);
    } else {
      services.createPerson(newPerson)
      getPersons();
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
      setPersons(fileteredPersons);
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
      <Agenda persons={persons} />
    </div>
  )
}

export default App
