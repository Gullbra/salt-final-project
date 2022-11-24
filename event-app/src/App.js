import './App.css';
import { useState, useEffect } from 'react'
import axios from 'axios';
import { Routes, Route} from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

import UserProfile from './components/UserProfile';
import ProtectedRoute from './components/auth/protected-route';
import Header from './components/Header';
import List from './components/List';
import AddEvent from './components/AddEvent';

function App() {
  
  const [partyState, setPartyState] = useState([]);
  const { isAuthenticated } = useAuth0();

  useEffect(() => {
    axios.get('https://api.localhostr.se/events')
      .then(response => setPartyState(response.data))
  }, [])


  return (
    <div className="App">
        <Header isAuthenticated={isAuthenticated}/>
        <Routes> 
          <Route path="/" element={<List partyState={partyState}/>} />
          <Route path="/userprofile" element={<UserProfile/>} /> 

          <Route
            path="/addevent"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <AddEvent partyState={partyState} setPartyState={setPartyState}/>
              </ProtectedRoute>
            }
          />
        </Routes>
    </div>
  );
}

export default App;



