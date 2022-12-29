import { useState, useEffect } from 'react'
import axios from 'axios';
import { Routes, Route } from "react-router-dom";
// import { useAuth0 } from "@auth0/auth0-react";

import './styles/base.css'
import './styles/google-symbols.css'
import './styles/loading_spinner.css'
import {IEvent} from './util/typesAndInterfaces'

import {Header, Footer} from './components/HeaderFooter';
import EventList from './components/EventList';
import EventPage from './components/EventPage';
import UserProfile from './components/UserProfile';
import CreateEvent from './components/CreateEvent';
// import ProtectedRoute from './components/auth/protected-route';

let firstRender:boolean = true

function App() {
  
  const [ eventState, setEventState ] = useState<IEvent[]>([]);
  const [ eventsLoading, setEventsLoading ] = useState<boolean>(true)
  const [ hasErrored, setHasErrored ] = useState<(boolean | string)[]>([false])
  
  useEffect(() => {
    firstRender 
      ? firstRender = false
      : axios
        .get(`${process.env.REACT_APP_DOMAIN}/api/events`)
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
  }, [])

  return (
    <>
      <Header/>
      <main className={eventsLoading || hasErrored[0] ? 'site__main main--flex' : 'site__main'}>
        <Routes>
          <Route 
            path="/" 
            element={
              eventsLoading
                ? <loading-spinner class="lds-dual-ring"/>
                : hasErrored[0]
                    ? <div>{hasErrored[1]}</div>
                    : <EventList 
                        eventState={eventState}
                      />
            } 
          />
          {eventState.map(event => (
            event._id && (
              <Route
                key={event._id} 
                path={`/events/${event._id}`} 
                element={
                  <EventPage 
                    event={event}
                    // setEventState={setEventState}
                  />
                }
              />
            )
          ))}
          <Route 
            path="/userprofile" 
            element={
              //<ProtectedRoute>
              <UserProfile 
                // eventState={eventState} 
                // setEventState={setEventState}
              />
              //</ProtectedRoute>
            } 
          />
          <Route
            path="/createevent"
            element={
              //<ProtectedRoute isAuthenticated={isAuthenticated}>
              <CreateEvent 
                //eventState={eventState} 
                setEventState={setEventState}
                />
              //</ProtectedRoute>
          }
        /> 
        </Routes> 
      </main>
      <Footer/>
    </>
  );
}

export default App;
