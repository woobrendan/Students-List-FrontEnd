import { Chip } from '@mui/material';

export default function TagList(props) {
  const mappedTags = props.tagList.map((tag, index) => (
    <Chip label={tag} key={index + 1}/>
  ))
  return (
    <>
      {mappedTags}
    </>
  )
}