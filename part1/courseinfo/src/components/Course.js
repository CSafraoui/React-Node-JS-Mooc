const Header = (props) => {
    return (
      <h1>{props.course.name}</h1>
    );
  }
  
  const Total = (props) => {
    let sum = 0
    props.parts.forEach(value => { sum += value.exercises }) 
    return (
      <p>Number of exercises {sum}</p>
    );
  }
  
  const Content = (props) => {
    const r = props.parts.map(part => <h4 key={part.id}>{part.name} {part.exercises}</h4>)
    return (
      <div>
        {r}
      </div>
    );
  }


function Course ( {course}) {
    return(
        <div >
            <Header course={course} />
            <Content parts={course.parts}/>
            <Total parts={course.parts} />
        </div>
    )
}

export default Course;
