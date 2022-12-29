import { useState, useEffect } from 'react'
import axios from 'axios';
import { Routes, Route,
  useNavigate, 
  useLocation 
} from "react-router-dom";

import './styles/base.css'
import './styles/google-symbols.css'
import './styles/loading_spinner.css'
import {IEvent} from './util/typesAndInterfaces'

import {Header, Footer} from './components/HeaderFooter';
import EventList from './components/EventList';
import EventPage from './components/EventPage';
import UserProfile from './components/UserProfile';
import CreateEvent from './components/CreateEvent';

let firstRender:boolean = true

function getPageFromUrl(query:any):number {
  if (!query) return 1
  const match = query.match(/page=[\d]+/) 
  // if (!query.match(/page=[\d]+/)) return 1
  // if (!query.match(/page=[\d]+/)[0].split('=')[1]) return 1

  return match 
    ? Number(match[0].split('=')[1])
    : 1
}

function App() {
  // const currentPath = useLocation().pathname
  const currentSearch = useLocation().search
  const initPage = getPageFromUrl(currentSearch)  
  const navigate = useNavigate()

  const [ page, setPage ] = useState<number>(initPage)
  const [ eventState, setEventState ] = useState<IEvent[]>([]);
  const [ eventsLoading, setEventsLoading ] = useState<boolean>(true)
  const [ hasErrored, setHasErrored ] = useState<(boolean | string)[]>([false])
    
  useEffect(() => {
    firstRender 
      ? firstRender = false
      : axios
        .get(`${process.env.REACT_APP_DOMAIN}/api/events/`) //?page=${page}
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
  }, [
    //page
  ])

  useEffect(()=> {
    navigate(`/?page=${page}`)
  }, [page])


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
                    : <>
                        <p>{`page: ${page}`}</p>
                        <EventList 
                          eventState={eventState}
                        />
                        {page > 1 && (
                          <button
                            onClick={() => {setPage(page - 1)}}
                          >
                            prev page
                          </button>
                        )}
                        <button
                          onClick={()=>{setPage(page + 1)}}
                        >next page
                        </button>
                      </>
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
