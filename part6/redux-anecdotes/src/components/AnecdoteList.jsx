import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer';
import { likeNotification, deleteNotification } from '../reducers/notificationReducer';

const AnecdoteList = () => {
  const anecdotes = useSelector(state => {
    if(state.filter === "") return state.anecdotes;
    return state.anecdotes.filter(anecdote => anecdote.content.includes(state.filter));
  }).sort((a, b) => b.votes - a.votes);
  const dispatch = useDispatch()

  const vote = (anecdote) => {
    dispatch(likeNotification(anecdote.content))
    setTimeout(() => {
      dispatch(deleteNotification(anecdote.content))
    }, 5000);
    dispatch(voteAnecdote(anecdote.id))
  }

  return (
  <div>
    {anecdotes.map(anecdote =>
      <div key={anecdote.id}>
        <div>
          {anecdote.content}
        </div>
        <div>
          has {anecdote.votes}
          <button onClick={() => vote(anecdote)}>vote</button>
        </div>
      </div>
    )}
  </div>
  )
};

export default AnecdoteList;




