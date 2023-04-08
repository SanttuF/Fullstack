import { useState } from 'react'

const StatisticLine = ({text, value}) => (
  <tr>
    <td>{text}</td> 
    <td>{value}</td>
  </tr>
)

const Statistics = ({good, neutral, bad}) => {
  const sum = good+neutral+bad

  if (sum === 0) {
    return (<p>No feedback given</p>)
  }

  const avg = (good - bad) / sum
  const pos = good / sum * 100

  return (
    <table>
      <tbody>
        <StatisticLine text = "Good" value = {good}/>
        <StatisticLine text = "Neutral" value = {neutral}/>
        <StatisticLine text = "Bad" value = {bad}/>
        <StatisticLine text = "All" value = {sum}/>
        <StatisticLine text = "Average" value = {avg}/>
        <StatisticLine text = "Positive" value = {pos}/>
      </tbody>
    </table>
    )
}

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>Give feedback</h1>
      <Button handleClick={() => setGood(good + 1)} text = "good" />
      <Button handleClick={() => setNeutral(neutral + 1)} text = "neutral" />
      <Button handleClick={() => setBad(bad + 1)} text = "bad" />
      <h1>Statistics</h1>
      <Statistics good = {good} neutral = {neutral} bad = {bad} />
    </div>
  )
}

export default App