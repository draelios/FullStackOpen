import React from 'react'

const NewPerson = ({newName, newNumber, onNameChange, onNumberChange, addPerson}) => {
  return (
    <>
      <h2>Add a new contact:</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={onNameChange} />
        </div>
        <div>
          number: <input value={newNumber} onChange={onNumberChange} />
        </div>
        <div>
          <button type="submit" >add</button>
        </div>
      </form>
    </>
  )

}

export default NewPerson;