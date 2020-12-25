import React from 'react'
import Contact from './Contact'

const Agenda = ({filter, persons}) => {
  const list = persons.filter(pers => pers.name.toLowerCase().indexOf(filter.toLowerCase()) > -1)
  return (
    <>
      <h2>Agenda</h2>
      <table>
        <tbody>
          {list.map(person => <Contact key={person.name} person={person}/>)}
        </tbody>
      </table>
    </>
  )
}

export default Agenda;