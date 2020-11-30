import React from 'react'
import services from '../Services/services.js'

const Contact = ({person}) => {
  return(
    <tr>
      <td>{person.name}</td>
      <td>{person.number}</td>
      <button type='button' onClick={services.deletePerson}>delete</button>
    </tr>    
  )
}

export default Contact;