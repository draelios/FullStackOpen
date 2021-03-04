import React from 'react'
import AnecdoteForm from './components/AnecdoteForm';
import AnecdoteList from './components/AnecdoteList';
import Notification from './components/Notification';
import AnecdoteFilter from './components/AnecdoteFilter';


const App = () => {

  return (
    <div>
      <Notification />
      <h2>Anecdotes</h2>
      <AnecdoteFilter/>
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  )
}

export default App