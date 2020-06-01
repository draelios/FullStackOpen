import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = (props) => {
  const [selected, setSelected] = useState(0);
  const [points, setPoints] = useState(new Array(6).fill(0));
  const [maxVoted, setMaxVoted] = useState(0);
  
  const newQuote = () => {
    const quoteNumber = Math.floor(Math.random()*anecdotes.length);
    setSelected(quoteNumber)
  }

  const voteQuote = () => {
    let newPoints = [...points];
    newPoints[selected] += 1;
    setPoints(newPoints);
    mostVoted();
  }

  const mostVoted = () => {
    const max = points.indexOf(Math.max(...points));
    if (points[max] <= points[selected]) setMaxVoted(selected);
  }

  const Anecdote = ({anecdote, points}) => {
    return (
      <>
        <p>{anecdote}</p>
        <p>has {points} votes</p>
      </>
    )
  }

  return (
    <div> 
      <h1> Anecdote of the day</h1>
      <Anecdote anecdote={props.anecdotes[selected]} points={points[selected]} />
      <button onClick={voteQuote}>Vote</button>
      <button onClick={newQuote}>Random quote</button>
      <h1> Anecdote with the most votes</h1>
      <Anecdote anecdote={props.anecdotes[maxVoted]} points={points[maxVoted]} />
    </div>
  )
}



const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(<App anecdotes={anecdotes}/>, document.getElementById('root'))