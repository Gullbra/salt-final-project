import './App.css';
import { useState, useEffect } from 'react'
import Header from './components/Header';
import List from './components/List';
import AddEvent from './components/AddEvent';
import axios from 'axios';
// eslint-disable-next-line
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserProfile from './components/UserProfile'

function App() {
  
  const [partyState, setPartyState] = useState([]);
  
  useEffect(() => {
    axios.get(`${process.env.REACT_APP_DOMAIN}/events`)
      .then(response => setPartyState(response.data))
  }, [])

  return (
    <div className="App">
        <Header />
        <Routes> 
          <Route path="/" element={<List partyState={partyState}/>} />
          <Route path="/userprofile" element={<UserProfile/>} /> 
          <Route path="/addevent" element={<AddEvent partyState={partyState} setPartyState={setPartyState}/>} /> 
        </Routes>
    </div>
  );
}

export default App;



