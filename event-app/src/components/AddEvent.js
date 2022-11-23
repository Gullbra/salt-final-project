import axios from 'axios';
import { useRef } from 'react';
import './AddEvent.css'

const AddEvent = ({ partyState, setPartyState }) => {
  
  const titleRef = useRef(null);
  const descRef = useRef(null);
  const locationRef = useRef(null);
  const dateRef = useRef(null);
  
  const addEvent = (event) => {
    event.preventDefault()

    axios
      .post('https://api.localhostr.se/events', {
        title: titleRef.current.value,
        desc: descRef.current.value,
        location: locationRef.current.value,
        date: dateRef.current.value,
      })
      .then(response => {
        titleRef.current.value = ''
        descRef.current.value = ''
        locationRef.current.value = ''
        dateRef.current.value = null
        setPartyState([...partyState, response.data])
			});
  } 

  return (
    <form className="addEvent" onSubmit={addEvent}>
			<label className="addEvent__label-title" htmlFor="titleInput">Title</label>
      <input className="addEvent__input-title" ref={titleRef} name="title" id="titleInput" placeholder="title..." />

			<label className="addEvent__label-desc" htmlFor="descInput">Description</label>
      <input className="addEvent__input-desc" ref={descRef} name="desc" id="descInput" placeholder="description..." />

			<label className="addEvent__label-location" htmlFor="locationInput">Location</label>
      <input className="addEvent__input-location" ref={locationRef} name="location" id="locationInput" placeholder="location..." />

			<label className="addEvent__label-date" htmlFor="dateInput">Date</label>
      <input className="addEvent__input-date" ref={dateRef} name="date" id="dateInput" type='datetime-local' />

			<button className="addEvent__button" type="submit">Add</button>
    </form>
  )
}

export default AddEvent