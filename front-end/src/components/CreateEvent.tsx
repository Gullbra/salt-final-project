import React, { useEffect, useRef } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import axios from 'axios';
import Event from "../util/classes";
import { IEvent } from "../util/typesAndInterfaces";
import { useNavigate } from 'react-router-dom'

import '../styles/styling-CreateEvent.css'

const CreateEvent = (
  { setEventState }:{ setEventState: React.Dispatch<React.SetStateAction<IEvent[]>>}
) => {
  
  const navigate = useNavigate();
  const {
    isAuthenticated, 
    isLoading, 
    loginWithRedirect,  
    user
  } = useAuth0();

  useEffect(() => {}, [isLoading])
  
  const titleRef = useRef<HTMLInputElement>(null);
  const descRef = useRef<HTMLTextAreaElement>(null);
  const locationRef = useRef<HTMLInputElement>(null);
  const dateRef = useRef<HTMLInputElement>(null);

  if (isLoading) {
    return <loading-spinner class="lds-dual-ring"/>
  } else if (!isAuthenticated) {
    loginWithRedirect()
    return <loading-spinner class="lds-dual-ring"/>;
  }


  const createEvent = () => {

    if (!(titleRef.current && descRef.current && locationRef.current && dateRef.current && user && user.sub)
    ) {
      throw new Error("Inputfield(s) is/are empty!")
    }
    console.log('click')
    
    const newEvent = new Event(
      titleRef.current.value,
      descRef.current.value,
      locationRef.current.value,
      dateRef.current.value,
      user.sub.split('|')[1]
    )
    titleRef.current.value = ''
    descRef.current.value = ''
    locationRef.current.value = ''
    dateRef.current.value = ''

    axios
      .post(`${process.env.REACT_APP_DOMAIN}/api/events`, newEvent)
      .then(() => {
        axios
          .get(`${process.env.REACT_APP_DOMAIN}/api/events`)
          .then(response => setEventState(response.data))
          .then(() =>  navigate('/'))
			})
  }

  return (
    <form-wrapper class="main__form-wrapper">
      <form className="main__form-element" 
        onSubmit={(event: React.SyntheticEvent) => {
          event.preventDefault()
          createEvent()
        }}
      >
        <label className="form-element__label" 
          htmlFor="titleInput"
        >
          Title
        </label>
        <input className="form-element__input" 
          ref={titleRef} id="titleInput" required 
          type="text" placeholder="Write a title..."
        />

        <label className="form-element__label" 
          htmlFor="descInput"
        >
          Description
        </label>
        <textarea className="form-element__input --desc" 
          ref={descRef} id="descInput" required  
          placeholder="Write a description..." 
        />

        <label className="form-element__label" 
          htmlFor="locationInput"
        >
          Location
        </label>
        <input className="form-element__input"
          ref={locationRef} id="locationInput" required  
          placeholder="Add location..." 
        />

        <label className="form-element__label"
          htmlFor="dateInput"
        >
          Date
        </label>
        <input className="form-element__input"
          ref={dateRef} id="dateInput" required
          type='datetime-local' 
        />

        <button className="form-element__button" 
          type="submit"
        >
          Create event
        </button>
      </form>
    </form-wrapper>
  )
}

export default CreateEvent