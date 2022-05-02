export default function Grades(props) {

  const mappedGrades = props.grades.map((grade, index) =>(
    <li key={index}>
      Test {index + 1}:      {Number(grade)} %
    </li>
  ))
  
  return (
    <ul>
      {mappedGrades}
    </ul>
  )
}