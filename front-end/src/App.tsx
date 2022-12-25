import { useState, useEffect } from 'react'
import axios from 'axios';
import { Routes, Route } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

import './styles/base.css'

import {Header, Footer} from './components/HeaderFooter';
import EventList from './components/EventList';

/*
import UserProfile from './components/UserProfile';
import ProtectedRoute from './components/auth/protected-route';
import AddEvent from './components/AddEvent';
import EventPage from './components/EventPage';
*/

let firstRender:boolean = true

function App() {
  
  const [ eventState, setEventState ] = useState([]);
  /*
  const { isAuthenticated } = useAuth0();
  */
  useEffect(() => {
    firstRender 
      ? firstRender = false
      : axios
        .get(`${process.env.REACT_APP_DOMAIN}/api/events`)
        .then(response => setEventState(response.data))
  }, [])


  return (
    <>
      <Header 
        // isAuthenticated={isAuthenticated} 
        // setEventState={setEventState} 
        />
      <Footer/>

      <Routes>
        <Route 
          path="/" 
          element={
            <EventList 
              eventState={eventState} 
              // setEventState={setEventState}
            />
          } 
        />
      </Routes> 

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



