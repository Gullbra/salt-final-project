import './EventPage.css'
import { DateTime } from 'luxon'
import { Link } from 'react-router-dom'
import { useAuth0 } from "@auth0/auth0-react";
import { useRef, useState } from 'react';
import axios from 'axios';

const EventPage = ({ party, setPartyState }) => {
  const { user } = useAuth0()
  const inputTitle = useRef()
  const inputDesc = useRef()
  const inputLocation = useRef()
  const inputDate = useRef()
  // console.log(party)

  const [editingMode, setEditingMode] = useState(false)
  const [editingState, setEditingState] = useState({
    title : party.title,
    desc : party.desc,
    location : party.location,
    date : party.date
  })
  
  const formatedDate = DateTime.fromISO(party.date)

  const editFunc = () => {
    setEditingMode(!editingMode)
  }
  
  const updateEvent = (event) => {
    event.preventDefault()

    const newParty = {
      title: inputTitle.current.value,
      desc: inputDesc.current.value,
      location: inputLocation.current.value,
      date: inputDate.current.value
    }

    axios
      .patch(`${process.env.REACT_APP_DOMAIN}/events/${party._id}`, newParty)
      .then(() => {
        axios
          .get(`${process.env.REACT_APP_DOMAIN}/events`)
          .then(response => {
            setPartyState(response.data)
            setEditingMode(!editingMode)
          })
      })   
  }

  return (
    <section className="EventPage">
      {editingMode 
        ? <form onSubmit={updateEvent}>
            <label htmlFor="inputTitle">Title:
              <input 
                type="text" 
                ref={inputTitle} 
                value={editingState.title} 
                onChange={(event) => setEditingState({...editingState, title: event.target.value})}></input>
            </label>
            <label htmlFor="inputDesc">Description:
              <input 
                type="text" 
                ref={inputDesc} 
                value={editingState.desc} 
                onChange={(event) => setEditingState({...editingState, desc: event.target.value})}></input>
            </label>
            <label htmlFor="inputLocation">Location: 
              <input 
                type="text" 
                ref={inputLocation} 
                value={editingState.location} 
                onChange={(event) => setEditingState({...editingState, location: event.target.value})}></input>
            </label>
            <label htmlFor="inputDate">Date & Time: 
              <input 
                type="datetime-local" 
                ref={inputDate} 
                value={editingState.date} 
                onChange={(event) => setEditingState({...editingState, date: event.target.value})}></input>
            </label>
            <button type='submit'>Save changes</button>
          </form>
        : <div>
            <Link className="userProfile__listLink" to='/'>
              <span className="material-symbols-outlined back-icon">arrow_back_ios_new</span>
            </Link>

            <h2 className="EventPage__title">{party.title}</h2>
            <p>{party.desc}</p>
            <ul>
              <li className='EventPage__location'><span>Location:</span> {party.location}</li>
              <li className='EventPage__date'><span>Date:</span> {formatedDate.toLocaleString(DateTime.DATE_MED)}</li>
              <li className='EventPage__time'><span>Time:</span> {formatedDate.toLocaleString(DateTime.TIME_24_SIMPLE)}</li>
            </ul>
          </div>}

      {user && user.sub.split('|')[1] === party.userID && (<button type='button' onClick={editFunc}>{editingMode ? 'Stop Editing':'Edit'}</button>)}

    </section>
  )
}

export default EventPage