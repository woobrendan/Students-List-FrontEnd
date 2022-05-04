import { Chip } from '@mui/material';

//receive  tag list from Tag component, and render out chip components accordingly
export default function TagList(props) {
  const mappedTags = props.tagList.map((tag, index) => (
    <Chip label={tag} key={index}/>
  ))
  return (
    <>
      {mappedTags}
    </>
  )
}