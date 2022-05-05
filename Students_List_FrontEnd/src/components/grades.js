export default function Grades(props) {

  const mappedGrades = props.grades.map((grade, index) =>(
    <div key={index}>
      <span>Test {index + 1}: </span>     
      <span>{Number(grade)} %</span>
    </div>
  ))
  
  return (
    <>
      {mappedGrades}
    </>
  )
}