import { useState } from 'react'
import { Routes, Route } from "react-router-dom";

import './styles/base.css'
import './styles/google-symbols.css'
import './styles/loading_spinner.css'
import {IEvent} from './util/typesAndInterfaces'

import {Header, Footer} from './components/HeaderFooter';
import EventList from './components/EventList';
import EventPage from './components/EventPage';
import UserProfile from './components/UserProfile';
import CreateEvent from './components/CreateEvent';

function App() {
  const [ eventState, setEventState ] = useState<IEvent[]>([]);

  return (
    <>
      <Header/>
      <main className={'site__main main--flex'}>
        <Routes>
          <Route 
            path="/"
            element={
              <EventList 
                eventState={eventState}
                setEventState={setEventState}
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
