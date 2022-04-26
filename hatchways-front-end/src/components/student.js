import React, {useEffect, useState} from 'react';
import axios from "axios";
import "./styles/student.css"

export default function StudentInfo() {
  const [students, setStudents] = useState([])
  
  useEffect(() => {
    axios.get(`https://api.hatchways.io/assessment/students`)
      .then((res) => {
        setStudents(res.data.students)
      })
      .catch((err) => console.log("Error: ", err))
  }, []);

  const getAverage = (grades) => {
    const intGrades = grades.map(grade => {
      return Number(grade)
    })
    const gradeTotal = intGrades.reduce((prev, current) => prev + current, 0)
    return gradeTotal / grades.length
  }

  const mappedStudents = students.map(student => (

    <div className="student-info-container" key={student.id}>
      <div className="student--img">
        <img src={student.pic} alt={student.firstName}/>
      </div>
      <div className="student-details">
        <div className="student-name">
          <h1>{(student.firstName.toUpperCase())} {(student.lastName.toUpperCase())}</h1>
        </div>
        <div className="details">
          <p>Email: {student.email}</p>
          <p>Company: {student.company}</p>
          <p>Skill: {student.skill}</p>
          <p>Average: {getAverage(student.grades)}%</p>
        </div>
      </div>
    </div>
  ))

  return (
    <>
      {mappedStudents}
    </>
  )
}