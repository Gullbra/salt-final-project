import axios from 'axios';
import { useRef } from 'react';

const AddEvent = ({ partyState, setPartyState }) => {
  
  const titleRef = useRef(null);
  const descRef = useRef(null);

  const addEvent = (event) => {
    event.preventDefault()

    axios
      .post('http://13.50.131.25/events', {
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
    <form className="addEvent__form" onSubmit={addEvent}>
			<label className="addEvent__label-title" htmlFor="titleInput">Title</label>
      <input className="addEvent__input-title" ref={titleRef} name="title" id="titleInput" placeholder="title..."></input>
			<label className="addEvent__label-desc" htmlFor="descInput">Description</label>
      <input className="addEvent__input-desc" ref={descRef} name="desc" id="descInput" placeholder="description..."></input>
			<button className="addEvent__button" type="submit">Add</button>
    </form>
  )
}

export default AddEvent