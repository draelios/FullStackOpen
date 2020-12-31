import React, { useState, useEffect } from 'react'
import Agenda from './components/Agenda.jsx'
import NewPerson from './components/NewPerson.jsx'
import Filter from './components/Filter.jsx'
import services from './Services/services.js';
import Success from './components/Success.jsx';
import Error from './components/Error.jsx';
import './App.css';

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
  const [ errorMessage, setErrorMessage] = useState(null);
  const [ successMessage, setSuccessMessage] = useState(null);

  useEffect(getPersons, []); 

  const addPerson = (event) => {
    event.preventDefault();

    const newPerson = {
      name: newName,
      number: newNumber
    };

    services.createPerson(newPerson)
      .then(result => {
        setNewName('');
        setNewNumber('');
        setSuccessMessage(`${newName} was created successfully`);
        setTimeout(() => {
          setSuccessMessage(null)
        }, 5000)
        getPersons();
      })
     .catch((error) => {
      setErrorMessage(error.response.data);
      setTimeout(() => {
          setErrorMessage(null)
      }, 5000)
      })
  };

  const deletePerson = (id) => {
    services.deleteOne(id)
    .then((result) => {
      getPersons();
      setSuccessMessage(`Contact deleted successfully`);
      setTimeout(() => {
          setSuccessMessage(null)
      }, 5000)
    })
    .catch((error) => {
      setErrorMessage(error.response.data);
      setTimeout(() => {
          setErrorMessage(null)
      }, 5000)
    })
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
      <Success message={successMessage} />
      <Error message={errorMessage} />
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
