import React, {useEffect, useState} from 'react';
import axios from "axios";

export default function StudentInfo() {
  const [students, setStudents] = useState([])
  console.log("students: ", students)
  useEffect(() => {
    axios.get(`https://api.hatchways.io/assessment/students`)
      .then((res) => {
        setStudents(res.data.students)
      })
      .catch((err) => console.log("Error: ", err))
  }, []);

  return (
    <>
    Hello
    </>
  )
}