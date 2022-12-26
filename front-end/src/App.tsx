import { useState, useEffect } from 'react'
import axios from 'axios';
import { Routes, Route } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

import './styles/base.css'
import './styles/google-symbols.css'
import './styles/loading_spinner.css'
import {IEvent} from './util/typesAndInterfaces'

import {Header, Footer} from './components/HeaderFooter';
import EventList from './components/EventList';
import EventPage from './components/EventPage';

/*
import UserProfile from './components/UserProfile';
import ProtectedRoute from './components/auth/protected-route';
import AddEvent from './components/AddEvent';
*/

let firstRender:boolean = true

function App() {
  /*
  const { isAuthenticated } = useAuth0();
  */

  const [ eventState, setEventState ] = useState<IEvent[]>([]);
  const [ isLoading, setIsLoading ] = useState(true)
  useEffect(() => {
    firstRender 
      ? firstRender = false
      : axios
        .get(`${process.env.REACT_APP_DOMAIN}/api/events`)
        .then(response => {
          setIsLoading(false)
          setEventState(response.data)
        })
  }, [])

  return (
    <>
      <Header/>
      <main className={isLoading ? 'site__main main--flex' : 'site__main'}>
        <Routes>
          <Route 
            path="/" 
            element={
              isLoading
                ? <loading-spinner class="lds-dual-ring"/>
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
                    // event={event}
                    // setEventState={setEventState}
                  />
                }
              />
            )
          ))}
        </Routes> 
      </main>
      <Footer/>



      {/* 

        <Route 
          path="/userprofile" 
          element={<UserProfile eventState={eventState} setEventState={setEventState}/>} />

        {eventState.map(party => (
          party._id && (
            <Route
              key={party._id} 
              path={`/events/${party._id}`} 
              element={
                <EventPage 
                  party={party}
                  setEventState={setEventState}/>
              }/>
          )
        ))}

        <Route
          path="/addevent"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <AddEvent eventState={eventState} setEventState={setEventState}/>
            </ProtectedRoute>
          }
        /> 
      */}
    </>
  );
}

export default App;



