import { prototype } from 'module';
import React from 'react';
import { Link } from 'react-router-dom'

import '../styles/styling-EventList.css'
import {PropTypes, IEvent} from '../util/typesAndInterfaces'

import EventCard from "./EventCard"
// import Search from "./Search";


const EventList = (
  {eventState}: {eventState:IEvent[]}
  // { eventState, setPartyState, yourParties, setYourParties, showDelBtn }
  ) => {
    

  // const partiesToShow = yourParties ? yourParties : eventState

  return (
    <>
      <section className='main__event-list'>
        {eventState.map( (event:IEvent, index:number) => (
            <EventCard 
              key={index} 
              event={event}
              // showDelBtn={showDelBtn}
              // eventState={eventState} 
              // setPartyState={setPartyState} 
              // yourParties={yourParties} 
              // setYourParties={setYourParties}
            />
        ))}
      </section>

    {/* 
    {!showDelBtn && (<Search setPartyState={setPartyState} />)}

    <section className={`${showDelBtn ? 'list--profile' : 'list'}`}>
      {
        partiesToShow.map( (party, i) => (
          <EventCard 
            key={i} 
            party={party}
            showDelBtn={showDelBtn}
            eventState={eventState} 
            setPartyState={setPartyState} 
            yourParties={yourParties} 
            setYourParties={setYourParties}/>
        ))
      }
    </section>
    
    <Link className="list_eventLink " to='/addevent'><span className="material-symbols-outlined plus-icon">add_circle</span></Link> 
    */}
    </>
  )
}

export default EventList
