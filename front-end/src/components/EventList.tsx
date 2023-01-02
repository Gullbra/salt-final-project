import React, { useEffect, useReducer } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

import '../styles/styling-EventList.css'

import {IEvent, IListState, IListAction} from '../util/typesAndInterfaces'
import EventCard from "./EventCard"
import { useAuth0 } from '@auth0/auth0-react';
// import Search from "./Search";


let firstRender:boolean = true

const getPageFromUrl =(query:any):number => {
  if (!query) return 1
  const match = query.match(/\?page=[\d]+/) 
  return match
    ? Number(match[0].split('=')[1])
    : 1
}

const listReducer = (stateObj:IListState, action:IListAction):IListState => {
  return {...stateObj, ...action.payload}
}

const EventList = ({eventState, setEventState, usersEvents}: {
    eventState:IEvent[], 
    setEventState:React.Dispatch<React.SetStateAction<IEvent[]>>,
    usersEvents?:boolean
}) => {

  const currentSearch = useLocation().search
  const currentPath = useLocation().pathname
  const initPage = getPageFromUrl(currentSearch)  
  const navigate = useNavigate()
  const { user, isLoading } = useAuth0()

  const [ listState, setListState ] = useReducer(listReducer, {
    page: initPage,
    eventsLoading: true,
    hasErrored: [false, "error msg"]
  })
  
  useEffect(() => {
    const fetchURL = usersEvents
      ? `${process.env.REACT_APP_DOMAIN}/api/events/?page=${listState.page}&user=${user?.sub?.split('|')[1]}`
      : `${process.env.REACT_APP_DOMAIN}/api/events/?page=${listState.page}`
    firstRender && (!usersEvents || !isLoading)
      ? firstRender = false
      : axios
        .get(fetchURL)
        .then(response => {
          setListState({payload:{eventsLoading : false}})
          setEventState(response.data)
        })
        .catch(err => {
          setListState({payload:{
            eventsLoading : false, 
            hasErrored: [true, err.message]
          }})
        })
        .finally(()=>{
          console.log("📮 axios called")
        })
    navigate(`${currentPath}?page=${listState.page}`)
  }, [listState.page, currentPath, user])


  return (
    <list-wrapper class="main__list-wrapper">
      {usersEvents && <p>test!</p>}
      {!listState.eventsLoading && !listState.hasErrored[0] && (
        <p>{`page: ${listState.page}`}</p>
      )}      
      <section className='main__event-list'>
        {
          listState.eventsLoading
            ? <loading-spinner class="lds-dual-ring"/>
            : listState.hasErrored[0]
              ? <p>{listState.hasErrored[1]}</p>
              : <>
                  {eventState.map((event:IEvent) => (
                    <EventCard 
                      key={event._id} 
                      event={event}
                    />
                  ))}
                </>
        }
      </section>
      {!listState.eventsLoading && !listState.hasErrored[0] && (
        <>
          {listState.page > 1 && (
            <button
              onClick={() => {
                setListState({payload: {
                  eventsLoading: true, page: listState.page - 1
                }})
              }}>prev page
            </button>
          )}
          {eventState.length === 2 && (
            <button
              onClick={() => {
                setListState({payload: {
                  eventsLoading: true, page: listState.page + 1
                }})
              }}>next page
            </button>
          )}
        </>
      )} 
    </list-wrapper>
  )
}

export default EventList
