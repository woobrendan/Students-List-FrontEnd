import React, {useEffect, useState} from 'react';
import axios from "axios";
import "./styles/student.scss"
import "./styles/search.css"
import TextField from '@mui/material/TextField';
import add from './styles/add.png'
import minus from './styles/minimize-sign.png'
import $ from "jquery";
import StudentInfo from './StudentInfo';
import Tag from './Tag'

export default function StudentList() {
  const [students, setStudents] = useState([])
  const [searchStudent, setSearchStudent] = useState('');
  const [searchTag, setSearchTag] = useState('');
  const [fullTagList, setFullTagList] = useState([]);
  
  useEffect(() => {
    axios.get(`https://api.hatchways.io/assessment/students`)
      .then((res) => {
        setStudents(res.data.students)
      })
      .catch((err) => console.log("Error: ", err))
  }, []);

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

  const getTagList = (tagArray) => {
    setFullTagList((prev) => [
      ...prev, ...tagArray
    ])
  }

  // const searchTags = () => {
  //   fullTagList.filter(indivTag => {
  //     if (fullTagList.length === 0) {
  //       return indivTag
  //     } else if (indivTag.toLowerCase().includes(searchTag.toLowerCase())) {
  //       return indivTag
  //     }
  //   })
  // }

  // const addTagToStudent = (student, tag) => {
  //   if (student.tags) {
  //     student.tags.push(tag)
  //   } else {
  //     student.tags = [tag]
  //   }
  // }

  const mapStudents = (students) => {
    const mappedStudents = students.filter(val => {
      if(searchStudent === "") {
        return val;
      } else if (
        val.firstName.toLowerCase().includes(searchStudent.toLowerCase()) 
        || val.lastName.toLowerCase().includes(searchStudent.toLowerCase())) {
        return val;
      }
    })
    .map((student, index)=> (
      <div className="student-info-container" key={student.id}>
        <div className="student--img">
          <img src={student.pic} alt={student.firstName}/>
        </div>
        <div className="student-details">
          <StudentInfo student={student} index={index}/>
          <Tag getTagList={getTagList} />
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
      <TextField 
        id="standard-basic" 
        label="Search by tag" 
        variant="standard" 
        value={searchTag}
        onChange={e => {setSearchTag(e.target.value)}}
      />
      {mapStudents(students)}
    </>
  )
}