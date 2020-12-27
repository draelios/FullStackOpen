import React, { useState, useEffect } from 'react'
import Agenda from './components/Agenda.jsx'
import NewPerson from './components/NewPerson.jsx'
import Filter from './components/Filter.jsx'
import services from './Services/services.js';

const App = () => {

  const getPersons = () =>{
    services.getAll()
    .then(res => {
      const newPersons = [...res.data];
      setPersons(newPersons);
    });
  };

  const [ persons, setPersons ] = useState([]) ;
  const [ newName, setNewName ] = useState('');
  const [ newNumber, setNewNumber ] = useState('');
  const [ filter, setFilter ] = useState('');

  useEffect(getPersons, []); 

  const addPerson = (event) => {
    event.preventDefault();

    const newPerson = {
      name: newName,
      number: newNumber
    };

    if(persons.filter(person => person.name === newName).length > 0){
      alert(`${newName} is already added to the phonebook.`);
    } else {
      services.createPerson(newPerson)
      .then(result => {
        setNewName('');
        setNewNumber('');
        getPersons();
      })
    }
  };

  const deletePerson = (id) => {
    services.deleteOne(id);
    getPersons();
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  return (
    <div>
      <Filter filter={filter} handleFilterChange={handleFilterChange} />
      <NewPerson 
        newName={newName} 
        newNumber={newNumber} 
        onNameChange={handleNameChange}
        onNumberChange={handleNumberChange}
        addPerson={addPerson}
      />
      <Agenda filter={filter} persons={persons} deletePerson={deletePerson} />
    </div>
  )
}

export default App;
