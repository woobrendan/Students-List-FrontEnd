import React, {useEffect, useState} from 'react';
import axios from "axios";
import "./styles/student.scss"
import "./styles/search.css"
import TextField from '@mui/material/TextField';
import Grades from './grades';
import add from './styles/add.png'
import minus from './styles/minimize-sign.png'
import Tag from './Tag';
import $ from "jquery";

export default function StudentList() {
  const [students, setStudents] = useState([])
  const [searchStudent, setSearchStudent] = useState('');
  
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

  const handleToggle = (id) => {
    //check if grades are showing, toggle hidden attribute and change add/minus icon accordingly
    if ($(`#grade-student-${id}`).is('[hidden]')) {
      $(`#grade-student-${id}`).removeAttr('hidden');
      $(`#add-button-${id}`).attr("src", minus)
    } else {
      $(`#grade-student-${id}`).attr('hidden', '');
      $(`#add-button-${id}`).attr("src", add)
    }
  }

  const mapStudents = (students) => {
    const mappedStudents = students.filter(val => {
      if(searchStudent === "") {
        return val;
      } else if (val.firstName.toLowerCase().includes(searchStudent.toLowerCase()) || val.lastName.toLowerCase().includes(searchStudent.toLowerCase())) {
        return val;
      }
    })
    .map((student, index)=> (
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
          <div className="grades" id={`grade-student-${index + 1}`} hidden>
            <Grades grades={student.grades}/>
          </div>
          <Tag />
        </div>
        <div className="grades-toggle">
          <button onClick={() => handleToggle(index + 1)}>
            <img src={add} alt="add" id={`add-button-${index + 1}`}/>
          </button>
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