import axios from 'axios';
import { useRef } from 'react';

const AddEvent = ({ partyState, setPartyState }) => {
  
  const titleRef = useRef(null);
  const descRef = useRef(null);

  const addEvent = (event) => {
    event.preventDefault()

    axios
      .post('https://event-app-3zx2.onrender.com/events', {
        title: titleRef.current.value,
        desc: descRef.current.value
      })
      .then(response => {
        titleRef.current.value = ''
        descRef.current.value = ''
        setPartyState([...partyState, response.data])
			});
  } 

  return (
    <form onSubmit={addEvent}>
			<label htmlFor="titleInput">Title</label>
      <input ref={titleRef} name="title" id="titleInput" placeholder="title..."></input>
			<label htmlFor="descInput">Description</label>
      <input ref={descRef} name="desc" id="descInput" placeholder="description..."></input>
			<button type="submit">Add</button>
    </form>
  )
}

export default AddEvent