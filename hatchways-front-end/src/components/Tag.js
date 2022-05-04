import TextField from '@mui/material/TextField';
import { useState } from 'react';
import TagList from './TagList';
import { Chip } from '@mui/material';

export default function Tag() {
  const [tag, setTag] = useState("");
  const [tagList, setTagList] = useState([])
  const handleChange = (event) => {
    setTag(event.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    setTagList((prev) => ([
      ...prev, tag
    ]))
    setTag("")
  }

  return (
    <>
      <TagList tagList={tagList} />
      <form onSubmit={handleSubmit}>
        <TextField 
          id="standard-basic" 
          variant="standard"
          label="Add a tag"
          size="small"
          value={tag}
          onChange={handleChange}
        />
      </form>
    </>
  )
}