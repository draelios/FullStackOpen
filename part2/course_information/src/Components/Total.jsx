import React from 'react';


const Total = ({ parts }) => {
  const sum = parts.reduce((sum, el) =>{
    console.log(sum, el, el.exercises);
    return sum += el.exercises;
  }, 0)

  return (
    <p>Number of exercises: {sum}</p>
  ) 
}

export default Total;