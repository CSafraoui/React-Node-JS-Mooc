import { useState } from "react";
const Button = (props) => {
  return (
    <button onClick={props.handleClick}>{props.text}</button>
  )
}
function randomIntFromInterval() { // min and max included 
  return Math.floor(Math.random() * 7)
}

function App() {

  const [points, setPoints] = useState([0, 0, 0, 0, 0, 0, 0])
  var result = Object.values(points);
  const [indexMax, setIndexMax] = useState(0)
  const [max, setMax] = useState(Math.max.apply(null, result))
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients'
  ]

  const Vote = () => {
    const copy = { ...points }
    copy[selected] += 1
    setPoints(copy)
    var result = Object.values(copy);
    var max = Math.max.apply(null, result)
    setMax(max)
    setIndexMax(result.indexOf(max))
  }

  const [selected, setSelected] = useState(0)
  return (
    <div className="App">
      <h1>Anectode of the day</h1>
      <div>{anecdotes[selected]}</div>
      <div>has {points[selected]} votes</div>
      <Button text="next anecdote" handleClick={() => setSelected(randomIntFromInterval())}></Button>
      <Button text="vote" handleClick={() => Vote()}></Button>
      <h1>Anectode with must votes</h1>
      <div>{anecdotes[indexMax]}</div>
      <div>has {max} votes</div>
    </div>
  );


}

export default App;
