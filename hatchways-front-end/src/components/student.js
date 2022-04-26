import React, {useEffect, useState} from 'react';
import axios from "axios";

export default function StudentInfo() {
  const [students, setStudents] = useState([])
  
  useEffect(() => {
    axios.get(`https://api.hatchways.io/assessment/students`)
      .then((res) => {
        setStudents(res.data.students)
      })
      .catch((err) => console.log("Error: ", err))
  }, []);

  const mappedStudents = students.map(student => (
    <div className="student-info-container">
      <div className="student--img">
        <img src={student.pic} alt={student.firstName}/>
      </div>
      <h2>{student.firstName} {student.lastName}</h2>
      <p>Email: {student.email}</p>
      <p>Company: {student.company}</p>
      <p>Skill: {student.skill}</p>
      <p>Average: {student.average}</p>

    </div>
  ))

  return (
    <>
      {mappedStudents}
    </>
  )
}