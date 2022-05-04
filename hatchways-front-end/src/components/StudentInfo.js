import Grades from "./grades"
import Tag from "./Tag"


export default function StudentInfo(props) {
  const {student} = props

  const getAverage = (grades) => {
    const intGrades = grades.map(grade => Number(grade))
    const gradeTotal = intGrades.reduce((prev, current) => prev + current, 0)
    return gradeTotal / grades.length
  }

  return (
    <div className="student-details">
      <div className="student-name">
        <h1>{(props.student.firstName.toUpperCase())} {(student.lastName.toUpperCase())}</h1>
      </div>
      <ul className="details">
        <li>Email: {student.email}</li>
        <li>Company: {student.company}</li>
        <li>Skill: {student.skill}</li>
        <li>Average: {getAverage(student.grades)}%</li>
      </ul>
      <div className="grades" id={`grade-student-${props.index + 1}`} hidden>
        <Grades grades={student.grades}/>
      </div>
      <Tag />
    </div>
  )
}