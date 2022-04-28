import "./styles/search.css"
import TextField from '@mui/material/TextField';
const Search = (props) => {
  return (
    <>
    <TextField id="standard-basic" label="Search by name" variant="standard" value={props.searchName}/>
    </>
  )
}
export default Search;