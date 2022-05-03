import TextField from '@mui/material/TextField';
import { useState } from 'react';

export default function Tag() {
  const [tag, setTag] = useState("");
  const handleChange = (event) => {
    setTag(event.target.value)
  }
  return (
    <>
    <TextField 
      id="standard-basic" 
      variant="standard"
      label="Add a tag"
      size="small"
      value={tag}
      onChange={handleChange}
    />
    </>
  )
}