const Header = (props) => (
    <>
      <h1>{props.course}</h1>
    </>
  )
  
  const Content = ({parts}) => (
    <>
      {parts.map(part => <Part key = {part.id} name = {part.name} number = {part.exercises} />)}
    </>
    )
  
  const Part = (props) => (
    <>
      <p>{props.name} {props.number}</p>
    </>
  )
  
  const Total = ({parts}) => (
    <>
      <p>Number of exercises {parts.reduce((a, b) => a + b.exercises, 0)}</p>
    </>
  )
  
  const Course = ({course}) => (
    <>
      <Header course = {course.name}/>
      <Content parts = {course.parts}/>
      <Total parts = {course.parts}/>
    </>
  )

export default Course