// import React, { useEffect } from 'react';
import { useEffect } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
// import { Link } from 'react-router-dom'

import '../styles/styling-EventList.css'
import {IEvent} from '../util/typesAndInterfaces'

import EventCard from "./EventCard"
// import Search from "./Search";


const EventList = (
  {eventState}: {eventState:IEvent[]}
  // { eventState, setPartyState, yourParties, setYourParties, showDelBtn }
) => {
  
  /*
  const [ searchParams, setSearchParams ] = useSearchParams(useLocation().search);
  
  if(!/\?page=[\d]/.test(useLocation().search)) setSearchParams({page:"1"})
  console.log("🎨 Eventlist", useLocation().search)
  */
  
  // useEffect(() => {setSearchParams({page:"1"})},[])

  //const currentURL = useLocation().search
  //console.log(currentURL, !/\?page=[\d]/.test(currentURL))
  /*
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams();

  if(!/\?page=[\d]/.test(currentURL)) {
    //navigate(currentURL+'/?page=1')
    //setSearchParams({page: "1"})
  }
  console.log(searchParams)
  */

  // const partiesToShow = yourParties ? yourParties : eventState

  return (
    <list-wrapper class="main__list-wrapper">
      <section className='main__event-list'>
        {eventState.map( (event:IEvent) => (
            <EventCard 
              key={event._id} 
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
    
    <Link className="list_eventLink " to='/createevent'><span className="material-symbols-outlined plus-icon">add_circle</span></Link> 
    */}
    </list-wrapper>
  )
}

export default EventList
