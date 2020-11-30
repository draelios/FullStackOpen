import React from 'react'
import Contact from './Contact'

const Agenda = ({persons}) => {
  return (
    <>
      <h2>Agenda</h2>
      <table>
        <tbody>
          {persons.map(person => <Contact key={person.name} person={person}/>)}
        </tbody>
      </table>
    </>
  )
}

export default Agenda;