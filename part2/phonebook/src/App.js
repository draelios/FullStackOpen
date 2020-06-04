import React, { useState } from 'react'
import Agenda from './components/Agenda.jsx'
import NewPerson from './components/NewPerson.jsx'
import Filter from './components/Filter.jsx'

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]) ;
  const [ newName, setNewName ] = useState('');
  const [ newNumber, setNewNumber ] = useState('');
  const [ showList, setShowList ] = useState(persons);


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
      setFilteredList(persons);  
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
