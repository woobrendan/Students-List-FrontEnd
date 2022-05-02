import React, {useEffect, useState} from 'react';
import axios from "axios";
import "./styles/student.css"
import "./styles/search.css"
import TextField from '@mui/material/TextField';
import Grades from './grades';

export default function StudentInfo() {
  const [students, setStudents] = useState([])
  const [searchStudent, setSearchStudent] = useState('');
  const [displayGrades, setDisplayGrades] = useState(true);
  
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

  const handleToggle = () => {
    displayGrades ? setDisplayGrades(false) : setDisplayGrades(true) 
  }
  

  const mapStudents = (students) => {
    const mappedStudents = students.filter(val => {
      if(searchStudent === "") {
        return val;
      } else if (val.firstName.toLowerCase().includes(searchStudent.toLowerCase()) || val.lastName.toLowerCase().includes(searchStudent.toLowerCase())) {
        return val;
      }
    })
    .map(student => (
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
          <div className="grades" hidden={displayGrades}>
            <Grades grades={student.grades}/>
          </div>
        </div>
        <div className="grades-toggle">
          <button>Hello</button>
        </div>
      </div>
    ))
    return mappedStudents;
  }

  return (
    <>
      <TextField 
        id="standard-basic" 
        label="Search by name" 
        variant="standard" 
        value={searchStudent}
        onChange={e => {setSearchStudent(e.target.value)}}
      />
      {mapStudents(students)}
    </>
  )
}