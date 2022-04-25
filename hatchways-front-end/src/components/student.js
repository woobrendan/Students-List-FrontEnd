import React, {useEffect, useState} from 'react';
import axios from "axios";

export default function StudentInfo() {
  const [students, setStudents] = useState([])
  // useEffect(() => {
  //   axios.get(`https://api.hatchways.io/assessment/students`)
  //     .then((res) => {
  //       console.log("my data: ", res.data.students)
  //       setStudents(res.data.students)
  //     })
  //     .catch((err) => console.log("Error: ", err))
  // }, [])
  return (
    <>
    Hello
    </>
  )
}