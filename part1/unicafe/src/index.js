import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({handleClick, text}) => <button onClick={handleClick}> {text}</button>

const Title = ({text}) => <h1>{text}</h1>;

const Statistic = ({text, value}) =>{
  return(
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )
} 

const Statistics = ({good, neutral, bad}) =>{
  
  const all = good + neutral + bad;

  if(all <= 0){
    return <p>No feedback given</p>
  }

  const average = ((good - bad) / all).toFixed(2)
  const positive = (good * 100 / all).toFixed(2) + "%"

  return (
    <table>
      <tbody>
        <Statistic text="Good" value={good}/>
        <Statistic text="Neutral" value={neutral}/>
        <Statistic text="Bad" value={bad}/>
        <Statistic text="All" value={all}/>
        <Statistic text="Average" value={average}/>
        <Statistic text="Positive" value={positive}/>
      </tbody>
    </table>
  )
}

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const sections = ["Give feedback", "Statistics"]

  const goodReview = () => setGood(good + 1);
  
  const nuetralReview = () => setNeutral(neutral + 1);

  const badReview = () => setBad(bad + 1);

  return (
    <div>
      <Title text={sections[0]} />
        <Button handleClick={goodReview} text="Good"/>
        <Button handleClick={nuetralReview} text="Neutral"/>
        <Button handleClick={badReview} text="Bad"/>
      <Title text={sections[1]} />
        <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
