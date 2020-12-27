import React from 'react'


const Contact = ({person, deletePerson}) => {
  return(
    <tr>
      <td>{person.name}</td>
      <td>{person.number}</td>
      <button type='button' onClick={() => deletePerson(person.id)}> delete</button>
    </tr>    
  )
}

export default Contact;

