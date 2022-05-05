import TextField from '@mui/material/TextField';
import { useState } from 'react';
import TagList from './TagList';


export default function Tag(props) {
  const [tag, setTag] = useState("");
  const [tagList, setTagList] = useState([])

  //tag text  field value as  user inputs
  const handleChange = (event) => {
    setTag(event.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    setTagList((prev) => ([
      ...prev, tag
    ]))
    setTag("");
    props.getTagList(tagList);
  }

  return (
    <>
      <div className="taglist">
        <TagList tagList={tagList} />
      </div>
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