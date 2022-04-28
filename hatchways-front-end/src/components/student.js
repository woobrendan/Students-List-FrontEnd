import React, {useEffect, useState} from 'react';
import axios from "axios";
import "./styles/student.css"
import Search from './search';

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
    const intGrades = grades.map(grade => Number(grade))
    const gradeTotal = intGrades.reduce((prev, current) => prev + current, 0)
    return gradeTotal / grades.length
  }

  const mapStudents = (students) => {
    const mappedStudents = students.map(student => (
      <div className="student-info-container" key={student.id}>
        <div className="student--img">
          <img src={student.pic} alt={student.firstName}/>
        </div>
        <div className="student-details">
          <div className="student-name">
            <h1>{(student.firstName.toUpperCase())} {(student.lastName.toUpperCase())}</h1>
          </div>
          <ul className="details">
            <li>Email: {student.email}</li>
            <li>Company: {student.company}</li>
            <li>Skill: {student.skill}</li>
            <li>Average: {getAverage(student.grades)}%</li>
          </ul>
        </div>
      </div>
    ))
    return mappedStudents
  }

  return (
    <>
      <Search />
      {mapStudents(students)}
    </>
  )
}