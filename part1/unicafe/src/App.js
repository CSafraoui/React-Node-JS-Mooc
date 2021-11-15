import { useState } from "react";

const Button = (props) => {
  return(
    <button onClick={props.handleClick}>{props.text}</button>
  )
}

const StatisticLine = (props) => {
  return(
    
    <div>
      <table width="200px">
        <tbody>
        <tr>
          <td width="100px">{props.text}</td>
          <td >{props.value}</td>          
        </tr>
        </tbody>
      </table>
    </div>
  );
}

const Statistics = (props) => {
  const all = props.bad + props.good + props.neutral
  const percentage = props.good / all
  const average = (props.bad * -1) + (props.good * 1);
  return(
    <div>
        <StatisticLine text="good" value ={props.good} />
        <StatisticLine text="neutral" value ={props.neutral} />
        <StatisticLine text="bad" value ={props.bad} />
        <StatisticLine text="all" value ={props.bad+props.neutral+props.good} />
        <StatisticLine text="average" value ={average} />
        <StatisticLine text="percentage" value ={percentage} />
    </div>
  );
}

function App() {
  const [good,setGood] = useState(0)
  const [bad,setBad] = useState(0)
  const [neutral,setNeutral] = useState(0)
  
  if(good === 0 & bad === 0 & neutral === 0){
    return (
      <div className="App">
        <h1>Give Feedback</h1>
        <Button text="good" handleClick={() => setGood(good + 1)}></Button>
        <Button text="neutral" handleClick={()=> setNeutral(neutral + 1)}></Button>
        <Button text="bad" handleClick={()=> setBad(bad + 1)}></Button>
        <h1>Statistics</h1>
        <p>No feedback given</p>
      </div>
    );
  }
  else{
    return (
      <div className="App">
        <h1>Give Feedback</h1>
        <Button text="good" handleClick={() => setGood(good + 1)}></Button>
        <Button text="neutral" handleClick={()=> setNeutral(neutral + 1)}></Button>
        <Button text="bad" handleClick={()=> setBad(bad + 1)}></Button>
        <h1>Statistics</h1>
        <Statistics good={good} bad={bad} neutral={neutral}></Statistics>
      </div>
    );
  }
  
}

export default App;
