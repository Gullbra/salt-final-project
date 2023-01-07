/*
import { DateTime } from 'luxon'
import { Link } from 'react-router-dom'
import { useAuth0 } from "@auth0/auth0-react";
*/
import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react'
import '../styles/styling-EventPage.css'

import { IEvent } from '../util/typesAndInterfaces'
import { useNavigate } from 'react-router-dom';


const EventPage = (
  // { party, setPartyState }
  {event} : {event: IEvent}
  ) => {

  const { _id, title, desc, location, time_and_date } = event

  const { isAuthenticated, user } = useAuth0();
  const navigate = useNavigate()

  const [editingMode, setEditingMode] = useState<boolean>(false)
  const [editingState, setEditingState] = useState<IEvent>({
    title : event.title,
    desc : event.desc,
    location : event.location,
    time_and_date : event.time_and_date
  })

  const inputTitle = useRef<HTMLInputElement>(null)
  const inputDesc = useRef<HTMLTextAreaElement>(null)
  const inputLocation = useRef<HTMLInputElement>(null)
  const inputDate = useRef<HTMLInputElement>(null)

  //useEffect(()=>{}, [event])

  const updateEvent = () => {
    const newEvent: {title?: string, desc?:string, location?:string, time_and_date?:string} = {}

    if(inputTitle?.current?.value) newEvent.title = inputTitle.current.value
    if(inputDesc?.current?.value) newEvent.desc = inputDesc.current.value
    if(inputLocation?.current?.value) newEvent.location = inputLocation.current.value
    if(inputDate?.current?.value) newEvent.time_and_date = inputDate.current.value

    console.log("edited:", newEvent)
    console.log("old:", event)

    //event = newEvent
    //setEditingMode(!editingMode)
    axios
      .patch(`${process.env.REACT_APP_DOMAIN}/api/events/${_id}`, newEvent)
      .then(() => {
        axios
          .get(`${process.env.REACT_APP_DOMAIN}/api/events`)
          .then(response => {
            //setPartyState(response.data)
            setEditingMode(!editingMode)
            navigate('/userprofile/events')
          })
      })

    // const newParty = {
    //   title: inputTitle.current.value,
    //   desc: inputDesc.current.value,
    //   location: inputLocation.current.value,
    //   date: inputDate.current.value
    // }
    /*

    */
  }
  /*
  const { user } = useAuth0()
  // console.log(party)

  
  const formatedDate = DateTime.fromISO(party.date)

  const editFunc = () => {
    setEditingMode(!editingMode)
  }
  
  */

  return (
    <>
      {!editingMode 
        ? (
          <article className='main__event-page'>
            <h2 className='event-page__title'>{title}</h2>
            <p className='event-page__desc'>{desc}</p>
            <p>{time_and_date}</p>
            <p>{location}</p>
          </article>
        ) : (
          <form className="EventPage__form" 
            onSubmit={event => {
              event.preventDefault()
              updateEvent()
            }}
          >
            <label htmlFor="inputTitle" className='EventPage__label'>Title:</label>
              <input 
                type="text" 
                ref={inputTitle} 
                value={editingState.title} 
                onChange={(event) => setEditingState({...editingState, title: event.target.value})}></input>
            <label htmlFor="inputDesc" className='EventPage__label'>Description:</label>
              <textarea 
                className='EventPage__descInput'
                //type="text" 
                ref={inputDesc} 
                value={editingState.desc} 
                onChange={(event) => setEditingState({...editingState, desc: event.target.value})}></textarea>
            <label htmlFor="inputLocation" className='EventPage__label'>Location: </label>
              <input 
                type="text" 
                ref={inputLocation} 
                value={editingState.location} 
                onChange={(event) => setEditingState({...editingState, location: event.target.value})}></input>
            <label htmlFor="inputDate" className='EventPage__label'>Date & Time:</label>
              <input 
                type="datetime-local" 
                ref={inputDate} 
                value={editingState.time_and_date} 
                onChange={(event) => setEditingState({...editingState, time_and_date: event.target.value})}></input>
            <button type='submit' className="EventPage__saveBtn">Save changes</button>
          </form>
        )
      }

      {isAuthenticated && user?.sub?.split('|')[1] === event.userID && (
        <button 
          className="EventPage__stopEditBtn" 
          type='button' 
          onClick={() => setEditingMode(!editingMode)}
        >{editingMode ? 'Cancel':'Edit'}</button>
      )}
    </>



    /*
    <div className='EventPage__test'>
    <section className="EventPage">
      {editingMode 
        ? <form className="EventPage__form" onSubmit={updateEvent}>
            <label htmlFor="inputTitle" className='EventPage__label'>Title:</label>
              <input 
                type="text" 
                ref={inputTitle} 
                value={editingState.title} 
                onChange={(event) => setEditingState({...editingState, title: event.target.value})}></input>
            <label htmlFor="inputDesc" className='EventPage__label'>Description:</label>
              <textarea 
                className='EventPage__descInput'
                type="text" 
                ref={inputDesc} 
                value={editingState.desc} 
                onChange={(event) => setEditingState({...editingState, desc: event.target.value})}></textarea>
            <label htmlFor="inputLocation" className='EventPage__label'>Location: </label>
              <input 
                type="text" 
                ref={inputLocation} 
                value={editingState.location} 
                onChange={(event) => setEditingState({...editingState, location: event.target.value})}></input>
            <label htmlFor="inputDate" className='EventPage__label'>Date & Time:</label>
              <input 
                type="datetime-local" 
                ref={inputDate} 
                value={editingState.date} 
                onChange={(event) => setEditingState({...editingState, date: event.target.value})}></input>
            <button type='submit' className="EventPage__saveBtn">Save changes</button>
          </form>
        : <div className='EventPage__test2'>
            <Link className="userProfile__listLink" to='/'>
              <span className="material-symbols-outlined back-icon">arrow_back_ios_new</span>
            </Link>

            <h2 className='EventPage__title'>{party.title}</h2>
            <p className='EventPage__desc'>{party.desc}</p>
            <ul className='EventPage__info'>
              <li className='EventPage__location'><span>Location:</span> {party.location}</li>
              <li className='EventPage__date'><span>Date:</span> {formatedDate.toLocaleString(DateTime.DATE_MED)}</li>
              <li className='EventPage__time'><span>Time:</span> {formatedDate.toLocaleString(DateTime.TIME_24_SIMPLE)}</li>
            </ul>
          </div>}
    </section>
    </div>
    */
  )
}

export default EventPage