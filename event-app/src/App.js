import './App.css';
import { useState, useEffect } from 'react'
import Header from './components/Header';
import List from './components/List';
import AddEvent from './components/AddEvent';
import axios from 'axios';


function App() {
  
  const [partyState, setPartyState] = useState([]);
  
  useEffect(() => {
    axios.get('https://api.localhostr.se/events')
      .then(response => setPartyState(response.data))
  }, [])

  return (
    <div className="App">
      <Header />
      <AddEvent partyState={partyState} setPartyState={setPartyState}/>
      <List partyState={partyState} />
    </div>
  );
}

export default App;
