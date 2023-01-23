import { Routes, Route } from "react-router-dom";

import EventList from './components/EventList';
import EventPage from './components/EventPage';
import UserProfile from './components/UserProfile';
import CreateEvent from './components/CreateEvent';
import ProtectedRoute from './components/auth/protected-route';

import { IEvent } from "./util/typesAndInterfaces";

interface IRoutingProps {
  eventState: IEvent[]
  setEventState: React.Dispatch<React.SetStateAction<IEvent[]>>
}

const Routing = ({eventState, setEventState}:IRoutingProps) => {
  const routesArray = [
    {
      path: "*",
      element: <p>404: Nothing here</p>
    },
    {
      path: "/", 
      element: <EventList eventState={eventState} setEventState={setEventState}/>
    },
    ...eventState.map(event => ({
      path: `/events/${event._id}`, 
      element: <EventPage event={event}/>
    })),
    {
      path: "/userprofile", 
      element: <ProtectedRoute><UserProfile/></ProtectedRoute>
    },
    {
      path: "/userprofile/createevent", 
      element: <ProtectedRoute><CreateEvent setEventState={setEventState}/></ProtectedRoute>
    },
    {
      path: "/userprofile/events",
      element: <ProtectedRoute><EventList eventState={eventState} setEventState={setEventState} usersEvents/></ProtectedRoute>
    }
  ]

  return (
    <Routes>
      {routesArray.map((route, index) => {
        return <Route
          key={index}
          path={route.path}
          element={route.element} 
        />
      })}
    </Routes> 
  )
}

export default Routing