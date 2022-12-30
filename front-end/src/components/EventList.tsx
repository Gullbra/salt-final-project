// import React, { useEffect } from 'react';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
// import { Link } from 'react-router-dom'
import axios from 'axios';

import '../styles/styling-EventList.css'
import {IEvent, IListRedState, IListRedAction} from '../util/typesAndInterfaces'

import EventCard from "./EventCard"
// import Search from "./Search";


let firstRender:boolean = true

const getPageFromUrl =(query:any):number => {
  if (!query) return 1
  const match = query.match(/page=[\d]+/) 
  return match
    ? Number(match[0].split('=')[1])
    : 1
}

const listReducer = (stateObj:IListRedState, action:IListRedAction) => {
  switch (action.type) {
    case "EVENTS_FETCHED":
      return {...stateObj,
        eventsLoading: false
      }
    case "EVENTS_FETCHED_ERROR":
      return {...stateObj,
        eventsLoading: false,
        hasErrored: action.payload?.hasErrored
      }
    case "SET_PAGE":
      return {...stateObj,
        eventsLoading: true,
        page: action.payload?.page
      }
  }
}

const EventList = (
  {eventState, setEventState}: {
    eventState:IEvent[], 
    setEventState:React.Dispatch<React.SetStateAction<IEvent[]>>
  }
) => {

  const currentSearch = useLocation().search
  const initPage = getPageFromUrl(currentSearch)  
  const navigate = useNavigate()

  const [ page, setPage ] = useState<number>(initPage)
  const [ eventsLoading, setEventsLoading ] = useState<boolean>(true)
  const [ hasErrored, setHasErrored ] = useState<(boolean | string)[]>([false, "error msg"])
  
  useEffect(() => {
    firstRender 
      ? firstRender = false
      : axios
        .get(`${process.env.REACT_APP_DOMAIN}/api/events/?page=${page}`)
        .then(response => {
          setEventsLoading(false)
          setEventState(response.data)
        })
        .catch(err => {
          setEventsLoading(false)
          setHasErrored([true, err.message])
        })
        .finally(()=>{
          console.log("📮 axios called")
        })
    navigate(`/?page=${page}`)
  }, [page])


  return (
    <list-wrapper class="main__list-wrapper">
      {!eventsLoading && !hasErrored[0] && (
        <p>{`page: ${page}`}</p>
      )}      
      <section className='main__event-list'>
        {
          eventsLoading
            ? <loading-spinner class="lds-dual-ring"/>
            : hasErrored[0]
              ? <p>{hasErrored[1]}</p>
              : <>
                  {eventState.map( (event:IEvent) => (
                    <EventCard 
                      key={event._id} 
                      event={event}
                    />
                  ))}
                </>
        }
      </section>
      {!eventsLoading && !hasErrored[0] && (
        <>
          {page > 1 && (
            <button
              onClick={() => {
                setEventsLoading(true)
                setPage(page - 1)}}>prev page
            </button>
          )}
          {eventState.length === 2 && (
            <button
              onClick={() => {
                setEventsLoading(true)
                setPage(page + 1)}}>next page
            </button>
          )}
        </>
      )} 

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
